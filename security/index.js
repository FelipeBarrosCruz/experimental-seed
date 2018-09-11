'use strict';

let Security = (() => {

    let Configuration = (() => {
        return require('./config.json');
    })();

    return function constructor(App, Repository) {
        let Security = {},
            Injector = Repository.get('Injector'),
            Glob     = Repository.require('glob'),
            Async    = Repository.require('async');

        const BASE_DIR = Repository.get('BASE_DIR');

        let Rules       = Configuration.rules || {},
            Location    = Rules && Rules.location,
            Adapters    = Rules && Rules.adapter,
            Tasks       = [];

        let getRuleName = (str) => {
            let matches = str.match(/([^\/]+)\.js$/);

            if (!matches.length) {
                return false;
            }

            return matches[1].replace(/-([a-z])/g, (word) => {
                return word[1].toUpperCase();
            });
        };

        let LoadRules = (location, cb) => {
            Tasks.push((doNext) => {
                Glob(location, (err, files) => {
                    for(let i = 0; i < files.length; i++) {
                        let Name = getRuleName(files[i]);

                        try {
                            cb(Name, Injector.register(require(files[i])));
                        } catch(err) {
                            dev.debug('Some error to load Security rule'.red, err);
                        }
                    }

                    return doNext(null);
                });
            });
        };

        let formatLocation = (str) => {
            return Location
                    .replace('${dir}', BASE_DIR)
                    .replace(/\/\//, '/')
                    .concat('/')
                    .concat(str)
                    .concat('/')
                    .concat('*.js');
        }

        for(let adapterRule in Adapters) {
            LoadRules(formatLocation(Adapters[adapterRule]), (name, rule) => {
                Security[name] = rule;
            });
        }

        return (onLoad) => {
            return Async.waterfall(Tasks, (err) => {
                return onLoad(Security);
            });
        };
    };

})();

let Injector = ['App', 'Repository', Security];

module.exports = Injector;
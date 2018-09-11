'use strict';

let EntityAdapter = function(configuration) {
    let Repository = configuration.repository,
        Injector   = configuration.injector,
        doNext     = configuration.doNext,
        async      = Repository.require('async'),
        glob       = Repository.require('glob');

    let location    = configuration.location.replace('${dir}', configuration.dir);
    let helperTasks = [];

    let pushTask = function(file) {
        helperTasks.push(function registerTask(next) {
            try {
                let Entity = require(file);
                Injector.register(Entity);
                return next(null);
            } catch(err) {
                if (err.code == 'MODULE_NOT_FOUND') {
                    dev.debug('%s'.red, err);
                    return next(null);
                }
                console.log(file);
                throw err;
            }
        });
    };

    glob(location, (err, files) => {

        for(let i = 0; i < files.length; i++) {
            pushTask(files[i]);
        }

        async.waterfall(helperTasks, function finish() {
            dev.debug('[%s]'.yellow + ' => entity loaded with success'.green, helperTasks.length);
            configuration.doNext(null);
        });
    });
};

module.exports = EntityAdapter;
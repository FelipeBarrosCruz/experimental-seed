'use strict';
let async = require('async');

let Adapter = function(configuration, onFinish) {

    let app = configuration.app,
        dir =  /\/$/.test(configuration.dir)
            ? configuration.dir.replace(/\/$/, '')
            : configuration.dir;

    let adapters    = configuration.data,
        repository  = configuration.repository;

    let adapterTasks = [];

    let pushTask = function(name, configuration) {
        adapterTasks.push(function registerAdapter(doNext) {
            dev.debug('Register %s adapter'.cyan, name);
            configuration.doNext = doNext;

            try {
                let adapter = require('./${name}'.replace('${name}', name));
                adapter(configuration);
            } catch(err) {
                if (err.code == 'MODULE_NOT_FOUND') {
                    dev.debug('%s'.red, err);
                    doNext(null);
                }

                throw err;
            }
        });
    };


    let Injector = (function() {

            let register = function(args) {
                let argsLength  = args.length;

                if (!argsLength) {
                    return;
                }

                let midleware = argsLength && (args.splice((argsLength - 1), 1))[0];

                if (typeof midleware !== 'function') {
                    throw 'Exec midleware must be a function';
                }

                let toInject = [];

                for(let i = 0; i < argsLength; i++) {
                    if (Array.isArray(args[i]) && !args[i].length || !args[i] || args[i] !== undefined && !repository.exists(args[i])) {
                        continue;
                    }
                    toInject.push(repository.get(args[i]));
                }

                return midleware.apply(midleware, toInject);
            };

            return {
                register: register
            };
        })();

    for(let adapterName in adapters) {
        let adapterConfiguration = {
            app:        app,
            dir:        dir,
            injector:   Injector,
            location:   adapters[adapterName].location || []
        };
        pushTask(adapterName, adapterConfiguration);
    }

    async.waterfall(adapterTasks, function finish() {
        dev.debug('Routes loaded'.cyan);
        onFinish(null);
    });
};


module.exports = Adapter;
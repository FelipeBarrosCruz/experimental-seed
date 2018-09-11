'use strict';
let async = require('async');

let Adapter = function(configuration, onFinish) {
    let app = configuration.app,
        dir =  /\/$/.test(configuration.dir)
            ? configuration.dir.replace(/\/$/, '')
            : configuration.dir;

    let adapters   = configuration.data,
        Repository = configuration.repository,
        Injector   = configuration.injector;

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

    for(let adapterName in adapters) {
        let adapterConfiguration = {
            app:        app,
            dir:        dir,
            repository: Repository,
            injector:   Injector,
            location:   adapters[adapterName].location || [],
            security:   adapters[adapterName].security || null
        };
        pushTask(adapterName, adapterConfiguration);
    }

    async.waterfall(adapterTasks, function finish() {
        dev.debug('Routes loaded'.cyan);
        onFinish(null);
    });
};

module.exports = Adapter;
'use strict';

let async = require('async'),
    glob  = require('glob');

let HelpersAdapter = function(configuration) {
    let location    = configuration.location.replace('${dir}', configuration.dir);
    let helperTasks = [];

    let pushTask = function(file) {
        helperTasks.push(function registerHelperTasks(next) {
            try {
                let Helper = require(file);
                configuration.injector.register(Helper);
                return next(null);
            } catch(err) {
                if (err.code == 'MODULE_NOT_FOUND') {
                    dev.debug('%s'.red, err);
                    return next(null);
                }
                throw err;
            }
        });
    };

    glob(location, {cache: true}, function onLoadFiles(err, files) {
        for(let i = 0; i < files.length; i++) {
            pushTask(files[i]);
        }
        async.waterfall(helperTasks, function finish() {
            dev.debug('[%s]'.yellow + ' => helpers loaded with success'.green, helperTasks.length);
            configuration.doNext(null);
        });
    });
};

module.exports = HelpersAdapter;
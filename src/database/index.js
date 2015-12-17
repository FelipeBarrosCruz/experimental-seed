'use strict';
let async = require('async');

let Database = function(configuration, onFinish) {
    let app  = configuration.app,
        dir  = configuration.dir,
        data = configuration.data;

    let repository = {};

    let getDatabaseLocation = function(name) {
        return dir.concat(['src', 'database', name, 'index.js'].join('/'));
    }

    let setDatabaseRepository = function(name, value) {
        if (configuration.repository.exists(name)) {
            dev.debug('[%s] '.yellow + 'package already exist in repository, be careful'.red, name);
        }
        configuration.repository.set(name, value);
    }

    let databaseTasks =  [];

    let pushTask = function(name, data) {
        databaseTasks.push(function registerDatabase(done) {
            try {
                let Database = require(getDatabaseLocation(name));
                setDatabaseRepository((data.name || name), Database(data, done));
            } catch(err) {
                if (err.code == 'MODULE_NOT_FOUND') {
                    dev.debug('%s'.red, err);
                    doNext(null);
                }
                throw err;
            }
        });
    };

    for(let name in data) {
        pushTask(name, data[name]);
    }

    async.waterfall(databaseTasks, function finish() {
        dev.debug('Database loaded'.cyan);
        onFinish(null);
    });
};


module.exports = Database;
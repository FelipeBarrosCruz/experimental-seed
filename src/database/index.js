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

    let databaseTasks =  [];

    let pushTask = function(name, database) {
        databaseTasks.push(function registerDatabase(done) {
            let Database = require(getDatabaseLocation(name));
            Database({
                repository: repository,
                database: database
            }, done);
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
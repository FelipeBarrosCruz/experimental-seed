'use strict';

let async = require('async');

let EntityAdapter = function(configuration) {

    let helperTasks = [];

    async.waterfall(helperTasks, function finish() {
        dev.debug('[%s]'.yellow + ' => entity loaded with success'.green, 0);
        configuration.doNext(null);
    });

};

module.exports = EntityAdapter;
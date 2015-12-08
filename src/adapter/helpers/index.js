'use strict';

let async = require('async');

let HelpersAdapter = function(configuration) {

    let helperTasks = [];


    async.waterfall(helperTasks, function finish() {
        dev.debug('[%s]'.yellow + ' => helpers loaded with success'.green, 0);
        configuration.doNext(null);
    });

};

module.exports = HelpersAdapter;
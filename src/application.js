'use strict';
let express         = require('express'),
    bodyParser      = require('body-parser'),
    development     = require('./development'),
    AppRepository   = require('./app-repository'),
    async           = require('async');

let Application = function(onStart, onFinish) {
    var app = express();

    AppRepository.set('App', app);
    AppRepository.set('Repository', AppRepository);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    global.dev = new development();

    let configuration = onStart(app);

    let mainTasks = [];

    let pushTask = function(name, data) {
        mainTasks.push(function registerMainTask(next) {
            try {
                require('./${name}'.replace('${name}', name))({
                    app:        app,
                    repository: AppRepository,
                    dir:        configuration.dir,
                    data:       data
                }, next);
            }
            catch(err) {
                console.log(err);
                next(null);
            }
        });
    }

    for(let name in configuration.load) {
        pushTask(name, configuration.load[name]);
    }

    async.waterfall(mainTasks, function finish() {
        onFinish(app);
    });

    return app;
};

module.exports = Application;
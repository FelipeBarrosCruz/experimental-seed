'use strict';
let Express             = require('express'),
    BodyParser          = require('body-parser'),
    Development         = require('./development'),
    AppRepository       = require('./app-repository'),
    Injector            = require('./injector'),
    FileStreamRotator   = require('file-stream-rotator'),
    Morgan              = require('morgan'),
    Async               = require('async');

let __construct = function(Repository) {

    let constructor = {
        cors:               enableCors,
        expressFormHidrate: EnableExpressFormHidrate,
        globalVars:         EnableGlobalVars,
        logs:               EnableLogs
    };

    function enableCors() {
        Repository.get('App').use(function corsmidleware(req, res, next) {
            let Origin  = (process.env.NODE_ENV === 'production')
                        ? 'http://www.boutwo.com'
                        : req.headers.origin && (req.headers.origin.indexOf('http://') != -1)
                        ? 'http://boutwo.local'
                        : '*';

            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Allow-Origin', Origin);
            res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, HEAD');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
            next();
        });
        return constructor;
    };

    function EnableExpressFormHidrate() {
        Repository.get('App').use(BodyParser.urlencoded({ extended: false }));
        Repository.get('App').use(BodyParser.json());

        return constructor;
    };

    function EnableGlobalVars(data) {
        global.dev = new Development();

        if (typeof data !== 'object') {
            return constructor;
        }

        if (!Object.keys(data).length) {
            return constructor;
        }

        for (var property in data) {
            global[property] = data[property];
        }

        return constructor;
    };

    function EnableLogs() {
        let Configuration = Repository.get('APP_CONFIG').logs || null;

        if (!Configuration || Configuration && !Configuration.status) {
            return constructor;
        }

        let Directory  = Configuration
                            .location
                            .replace('${dir}', Repository.get('BASE_DIR'))
                            .replace(/\/\//g, '/')
                            .concat('/')
                            .concat(process.env.NODE_ENV);

        let FileSystem = Repository.require('fs');

        FileSystem.existsSync(Directory) || FileSystem.mkdirSync(Directory);

        let LogStream = FileStreamRotator.getStream({
            filename:   Directory.concat('/').concat(Configuration.filePattern),
            frequency:  Configuration.frequency,
            verbose:    Configuration.verbose
        });

        Repository.get('App').use(Morgan(Configuration.format, {
            stream: LogStream
        }));

        return constructor;
    };

    return constructor;
};

let Application = function(onStart, onFinish) {
    var App = Express();

    let AppInjector   = Injector(AppRepository),
        configuration = onStart(App);

    AppRepository.set('App', App);
    AppRepository.set('Repository', AppRepository);
    AppRepository.set('Injector', AppInjector);
    AppRepository.set('APP_CONFIG', configuration);
    AppRepository.set('BASE_DIR', configuration.dir);

    __construct(AppRepository)
        .cors()
        .expressFormHidrate()
        .globalVars()
        .logs()

    let mainTasks = [];

    let pushTask = function(name, data) {
        mainTasks.push(function registerMainTask(next) {
            try {
                require('./${name}'.replace('${name}', name))({
                    app:        App,
                    repository: AppRepository,
                    injector:   AppInjector,
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

    Async.waterfall(mainTasks, function finish() {
        onFinish(App);
    });

    return App;
};

module.exports = Application;
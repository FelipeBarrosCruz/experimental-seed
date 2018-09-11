'use strict';
let async               = require('async'),
    glob                = require('glob'),
    registerComponent   = require('./register-component');

let RegisterRouter = function(configuration, done) {
    let app         = configuration.app,
        path        = configuration.path,
        injector    = configuration.injector,
        routerList  = configuration.routerList,
        Repository  = configuration.repository,
        Security    = configuration.security;

    let getModuleName   = function(module) {
        let result;
        try {
            let keys = Object.keys(module);
            result  = (keys.length)
                    ? keys[0]
                    : false;
        } catch(err) {
            dev.debug('Cannot possible find module name'.red);
            result = false;
        };

        return result;
    };

    let name        = getModuleName(routerList),
        component   = routerList[name];

    if (!name || !component || Array.isArray(component) && !component.length) {
        return done(null);
    }

    let asyncTasks = [];

    let formatModuleName = function(name) {
        return "/{[module]}".replace('{[module]}', name);
    };

    app.use(
        formatModuleName(name),
        registerComponent({
            name:       name,
            path:       path,
            injector:   injector,
            component:  component,
            repository: Repository,
            security:   Security
        })
    );

    dev.debug(
        'Component'.cyan + ' [%s] '.yellow + 'register'.cyan + ' [%s] '.yellow + 'routes'.cyan,
        name,
        component.length || 0
    );
    done(null);
};

let RoutesAdapter = function(configuration) {
    let app         = configuration.app,
        doNext      = configuration.doNext,
        dir         =  /\/$/.test(configuration.dir)
                    ? configuration.dir.replace(/\/$/, '')
                    : configuration.dir,
        location    = configuration.location.replace('${dir}', dir);

    let formatPathName = function(path) {
        return path.replace('index.js', '');
    };

    let modulesTasks = [];

    let pushTask = function(file) {
        modulesTasks.push(function registerRouterTask(done) {
            RegisterRouter({
                app:        app,
                path:       formatPathName(file),
                injector:   configuration.injector,
                repository: configuration.repository,
                security:   configuration.security,
                routerList: require(file)
            }, done);
        });
    };

    glob(location, {cache: true}, function onLoadFiles(err, files) {
        for(let i = 0; i < files.length; i++) {
            pushTask(files[i]);
        }

        async.waterfall(modulesTasks, function finish() {
            doNext(null);
        });
    });
};

module.exports = RoutesAdapter;
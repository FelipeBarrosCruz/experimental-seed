'use strict';
let async               = require('async'),
    glob                = require('glob'),
    registerComponent   = require('./register-component');

let RegisterModule = function(routerList) {
    let asyncTasks = [];

    let formatModuleName = function(name) {
        return "/{[module]}".replace('{[module]}', name);
    };

    let pushTask = function(name, component) {
        asyncTasks.push(function registerModuleTask(done) {
            app.use(
                formatModuleName(name),
                registerComponent({
                    path: path,
                    name: name,
                    component: component
                })
            );
            done(null);
        });
    };

    let modules         = routerList,
        modulesLength   = modules.length;

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

    for(let i = 0; i < modulesLength; i++) {
        let module = modules[i],
            name   = getModuleName(module);

        if (name) {
            pushTask(name, module[name]);
        }
    }

    async.waterfall(asyncTasks, function onFinishRegisterModules() {
        dev.debug('[%s]'.yellow + ' Modules registered'.cyan, modulesLength);
        onFinish(app);
    });
}

let RegisterRoutes = function(configuration) {

    let app         = configuration.app,
        path        =  /\/$/.test(configuration.path)
                    ? configuration.path
                    : configuration.path.concat('/');

    let routerList  = configuration.routes,
        onFinish    = configuration.onFinish;
};

module.exports = RegisterRoutes;
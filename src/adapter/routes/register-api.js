'use strict';
let Multer = require('multer');

let validateComponent = function(componentAction) {
    let status = false;
    let methodRule = new RegExp(/(GET|PUT|POST|DELETE)/i);

    if (!methodRule.test(componentAction.method)) {
        dev.debug(
            'Module '.red + '[%s]'.yellow + ' method must be one of [GET|POST|PUT|DELETE]'.red,
            componentAction.api
        );
        status = true;
    }

    if (!componentAction.url) {
        dev.debug('Module URL is required'.red);
        status = true;
    }

    if (!componentAction.api) {
        dev.debug('Module API is required'.red);
        status = true;
    }

    return status;
};

let FormatMethodAction = function(str) {
    return str.toLowerCase();
};

let FormatApiAction = function(str) {
    return str.replace(/\.?([A-Z])/g, function (x, y){
        return "-" + y.toLowerCase()
    }).replace(/^-/, "");
};

let RegisterApiComponent = function(component, value) {
    dev.debug(
        'Register '.cyan + '[%s]'.yellow + ' => '.cyan + '[%s]'.yellow +  ' API Component'.cyan,
         component.name,
         value
    );

    let pathComponent   = component.path.replace('[{NAME}]', component.name),
        apiComponent    = FormatApiAction(value);

    return require(pathComponent.concat(['src', apiComponent].join('/')));
};

let Configuration = function(component) {
    let result = [];

    let pushUrl = function(value) {
        result.push(value);
    };

    let pushApi = function(value) {
        result.push(RegisterApiComponent(component, value));
    };

    return {
        pushUrl:    pushUrl,
        pushApi:    pushApi,
        instance:   function returnInstance() {
            return result;
        }
    };
};

let RegisterAPI = function(Router, Injector, component) {

    let componentName   = component.name,
        componentPath   = component.path,
        componentAction = component.action;

    if (validateComponent(componentAction)) {
        process.exit(0);
        return;
    }

    let configuration   = Configuration({
        name: componentName,
        path: componentPath
    });

    let method          = FormatMethodAction(componentAction.method);

    configuration.pushUrl(componentAction.url)
    configuration.pushApi(componentAction.api);

    if (typeof Router[method] === 'function') {

        let defaultMidleware = function(req, res, next) {
            dev.debug(
                'Invoke on Router '.cyan + '[%s]'.yellow + ' => '.cyan + '[%s]'.yellow +  ' API Component'.cyan,
                 componentName,
                 componentAction.api
            );
            next(null);
        };

        let instance = configuration.instance(),
            router   = instance.length && instance[0],
            toInject = instance.length > 1 && instance.splice((instance.length - 1), 1)[0],
            exec     = Injector.register(toInject),
            args     = [router, defaultMidleware, Multer().any(), exec];

        Router[method].apply(Router, args);
    }
};

module.exports = RegisterAPI;
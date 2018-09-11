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
        'Register '.cyan + '[%s]'.yellow + '::'.cyan + '[%s]'.yellow +  ' API Router'.cyan,
         component.name,
         value
    );

    let pathComponent   = component.path.replace('[{NAME}]', component.name),
        apiComponent    = FormatApiAction(value);

    return require(pathComponent.concat(['src', apiComponent].join('/')));
};

let Configuration = function(configuration) {
    let url      = null,
        api      = null,
        upload   = null,
        security = null;

    let setUrl = function(value) {
        url = value;
    };

    let setSecurity = function(value) {
        var Rules =  (typeof value === 'string')
                    ? [value]
                    : (Array.isArray(value))
                    ? value
                    : [];

        let SecurityComponent = configuration.repository.get(configuration.security),
            RulesLength       = Rules.length;

        if (!RulesLength || !SecurityComponent || !Object.keys(SecurityComponent).length) {
            return;
        }

        let result = [];

        for (let i = 0; i < RulesLength; i++) {
            let rule = SecurityComponent[Rules[i]];
            if (rule && typeof rule === 'function') {
                dev.debug(
                    'Set rule'.cyan + ' [%s] '.yellow + 'for'.cyan + ' [%s::%s] '.yellow + 'router'.cyan,
                    Rules[i],
                    configuration.name,
                    configuration.api
                );
                result = result.concat(rule);
            }
        }
        security = result;
    };

    let setApi = function(value) {
        api = RegisterApiComponent(configuration, value);
    };

    let setUpload = function(value) {
        upload = value;
    }

    let defaultMidleware = function(req, res, next) {
        dev.debug(
            'Invoke on Router '.cyan + '[%s]'.yellow + ' => '.cyan + '[%s]'.yellow +  ' API Router'.cyan,
             configuration.name,
             configuration.api
        );
        next(null);
    };

    return {
        setUrl:      setUrl,
        setApi:      setApi,
        setUpload:   setUpload,
        setSecurity: setSecurity,
        getRouter:   () => {
            let args = [];

            if (url && typeof url === 'string') {
                args.push(url);
            }

            args.push(defaultMidleware);

            if (security && Array.isArray(security) && security.length) {
                args = args.concat(security);
            }

            if (upload) {
                args.push(Multer().any());
            }

            if (api && Array.isArray(api)) {
                args.push(api);
            }

            return args;
        }
    };
};

let RegisterAPI = function(Router, Repository, Injector, Security, component) {

    let componentName     = component.name,
        componentPath     = component.path,
        componentAction   = component.action

    if (validateComponent(componentAction)) {
        process.exit(0);
        return;
    }

    let configuration = Configuration({
        name:       componentName,
        api:        componentAction.api,
        path:       componentPath,
        security:   Security,
        repository: Repository
    });

    let method = FormatMethodAction(componentAction.method);

    configuration.setUrl(componentAction.url);
    configuration.setSecurity(componentAction.security);
    configuration.setApi(componentAction.api);

    if (componentAction.upload) {
        configuration.setUpload(true);
    }

    if (typeof Router[method] === 'function') {

        let instance = configuration.getRouter(),
            toInject = instance.length > 1 && instance.splice((instance.length - 1), 1)[0];

        let exec = Injector.register(toInject),
            args = instance.concat([exec]);

        Router[method].apply(Router, args);
    }
};

module.exports = RegisterAPI;
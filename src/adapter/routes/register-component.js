'use strict';
let registerAPI = require('./register-api');

function registerComponent(configuration) {

    let name        = configuration.name,
        path        = configuration.path,
        component   = configuration.component,
        injector    = configuration.injector,
        Repository  = configuration.repository,
        Security    = configuration.security;

    dev.debug('Register %s component'.cyan, name);

    let Router = require('express').Router();

    let asyncTasks = [];

    let registerApiComponent = function(actionRequest) {
        registerAPI(Router, Repository, injector, Security, {
            path:       path,
            name:       name,
            injector:   injector,
            action:     actionRequest
        });
    };

    for(let i = 0; i < component.length; i++) {
        registerApiComponent(component[i]);
    }

    return Router;
};

module.exports = registerComponent;

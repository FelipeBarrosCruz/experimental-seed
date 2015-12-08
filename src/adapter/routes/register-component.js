'use strict';
let registerAPI = require('./register-api');

function registerComponent(configuration) {

    let name        = configuration.name,
        path        = configuration.path,
        component   = configuration.component;

    dev.debug('Register %s component'.cyan, name);

    let Router = require('express').Router();

    let asyncTasks = [];

    let registerApiComponent = function(actionRequest) {
        registerAPI(Router, {
            path: path,
            name: name,
            action: actionRequest
        });
    };

    for(let i = 0; i < component.length; i++) {
        registerApiComponent(component[i]);
    }

    return Router;
};

module.exports = registerComponent;

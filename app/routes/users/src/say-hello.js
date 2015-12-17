'use strict';

let ActionRequest = function(Repository) {

    let sayHello = function(name) {
        return 'Hello '
    };

    return function midleware(req, res, next) {
        res.end(sayHello(req.params.name || 'world'));
    };
};

let Inject = ['Repository', ActionRequest];

module.exports = Inject;
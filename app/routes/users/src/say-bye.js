'use strict';

let ActionRequest = function(Repository, MediaConvert) {

    let sayHello = function(name) {
        return 'Hello '
    };

    return function midleware(req, res, next) {
        res.end(sayHello(req.params.name || 'world'));
    };
};

let Inject = ['Repository', 'app.components.media-convert', ActionRequest];

module.exports = Inject;
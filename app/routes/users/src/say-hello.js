'use strict';

let ActionRequest = function(req, res, next) {

    res.end('Say => Hello');
};

module.exports = ActionRequest;
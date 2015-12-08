'use strict';

let ActionRequest = function(req, res, next) {

    res.end('Say => Bye');
};

module.exports = ActionRequest;
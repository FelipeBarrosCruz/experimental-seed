'use strict';

let ActionRequest = function(req, res, next) {

    res.end('Fooooooooo => ' + req.params.foo || 'BAR');
};

module.exports = ActionRequest;
'use strict';

let ActionRequest = function(req, res, next) {

    res.end('Baaaaaaaaa => ' + req.params.bar || 'FOO');
};

module.exports = ActionRequest;
'use strict';

let Error = function(res, configuration) {
    let http    = configuration.http    || 500,
        code    = configuration.code    || null,
        message = configuration.message || null;

    return res.status(http).json({
        status:  false,
        code:    code,
        message: message
    });
};

module.exports = Error;
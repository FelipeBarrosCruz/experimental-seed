'use strict';

let Success = function(res, configuration) {
    let http    = configuration.http    || 200,
        code    = configuration.code    || 0,
        data    = configuration.data    || {};

    return res.status(http).json({
        status: true,
        code:   code,
        data:   data
    });
};

module.exports = Success;
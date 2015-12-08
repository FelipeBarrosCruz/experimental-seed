'use strict';

let Development = function() {

    let debug = function() {
        if (process.env.NODE_ENV == 'development') {
            console.log.apply(console, arguments);
        }
    };

    return {
        debug: debug
    };
};

module.exports = Development;
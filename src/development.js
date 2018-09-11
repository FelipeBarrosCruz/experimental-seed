'use strict';

let Development = function() {

    let debug = function() {
        if (process.env.NODE_ENV === 'development') {
            return console.log.apply(console, arguments);
        }

        if (process.env.NODE_ENV === 'production') {
            console.log('[WARNING] ===>'.red + ' [%s] '.yellow + '<=== [WARNING]'.red, process.env.NODE_ENV);
            return console.log.apply(console, arguments);
        }
    };

    return {
        debug: debug
    };
};

module.exports = Development;
'use strict';

let Music = (Repository) => {

    return (configuration, callback) => {
        return callback(true, configuration);
    };
};

module.exports = Music;
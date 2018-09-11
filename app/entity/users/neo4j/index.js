'use strict';

let Entity = function(Repository) {
    let Model = require('./model')(Repository);

    return {
        model:  Model,
        src:    require('./src')(Repository, Model)
    };
};

module.exports = Entity;
'use strict';

let Model = function(Repository) {
    let Mongoose = Repository.require('database.mongo-one');
    let Schema   = require('./schema')(Repository);
    return Mongoose.model('User', Schema);
};

module.exports = Model;

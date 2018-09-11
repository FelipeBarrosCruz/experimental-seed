'use strict';

let Model = function(Repository) {
    let Neo4jDB = Repository.get('database.neo4j'),
        Name    = 'User',
        Model   = Repository.require('seraph-model').model(Neo4jDB, Name);

    Model.schema = require('./schema')(Repository);
    return Model;
};

module.exports = Model;

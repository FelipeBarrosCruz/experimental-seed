'use strict';
var mongoose = require('mongoose');

let MongoDBConnection = function(configuration, onFinish) {
    let database   = configuration.database,
        server     = 'mongodb://${h}/${c}'.replace('${h}', database.host).replace('${c}', database.collection),
        connection = mongoose.createConnection(server);

    mongoose.set('debug', (database.debug || false));

    connection.once('open', function(callback) {
        dev.debug('MongoDB Server: Application connected with success!'.green);
        return onFinish(null);;
    });

    connection.on('error', function(err) {
        dev.debug('MongoDB Server: Some error happend, please follow the error'.red);
        dev.debug(err);
        return onFinish(null);
    });

    return connection;
};

module.exports = MongoDBConnection;
'use strict';
let seraph = require('seraph');

let Neo4jDBConnection = function(configuration, onFinish) {
    let database = configuration.database,
        server = 'http://${h}:${p}'.replace('${h}', database.host).replace('${p}', database.port),
        connection = seraph({
            server: server,
            user: database.auth.user,
            pass: database.auth.pass
        });

    let queryTestSyntax = 'MATCH (n) RETURN n';

    connection.query(queryTestSyntax, {}, function(err, result) {
        if (err) {
            dev.debug('Neo4j Server: Some error happend, please follow the error'.red);
            dev.debug('Error:'.red);
            dev.debug('Message: '.red, + '[%s]'.yellow, err);
            dev.debug('Code: '.red + '[%s]'.yellow, err.code);
            return onFinish(null);;
        }

        dev.debug('Neo4j Server: Application connected with success!'.green);
        return onFinish(null);;
    });

    return connection;
};

module.exports = Neo4jDBConnection;
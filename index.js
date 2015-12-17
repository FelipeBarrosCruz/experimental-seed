'use strict';

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the Main module dependencies
let Application  = require('./src/application'),
    colors       = require('colors'),
    APP_HOST     = 'http://localhost',
    APP_PORT     = (process.env.NODE_ENV == 'production') ? 80 : 3232;

let onStart  = function(server) {

    let adapter = {
        helpers:    {
            location:   '${dir}/app/helpers/**/index.js',
        },
        entity:     {
            location:   '${dir}/app/entity/**/index.js'
        },
        routes:     {
            location:   '${dir}/app/routes/**/index.js'
        }
    };

    let database = {
        mongo: {
            name: 'database.mongo',
            host: '192.165.33.56',
            port: 27017,
            collection: 'fvel',
            auth: {
                user: false,
                pass: false
            },
            debug: true
        },
        neo4j: {
            name: 'database.neo4j',
            host: '192.165.33.20',
            port: 7474,
            auth: {
                user: 'neo4j',
                pass: '1q2w3e4r'
            },
            debug: true
        }
    };

    return {
        dir:     '/var/html/fvel-seed/',
        load: {
            database: database,
            adapter:  adapter
        }
    };
};

let onFinish = function(server) {
    server.listen(APP_PORT, function() {
        dev.debug('Application Server started'.green);
        dev.debug('Application Server running on: '.green + '%s:%s'.yellow, APP_HOST, APP_PORT);
    });
};

let application = Application(onStart, onFinish);

module.exports = application;
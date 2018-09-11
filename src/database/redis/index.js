'use strict';

let RedisDBConnection = function(configuration, doNext) {
    let database   = configuration.database,
        Repository = configuration.repository;

    let Redis       = Repository.require('redis'),
        Session     = Repository.require('express-session'),
        RedisStore  = Repository.require('connect-redis')(Session);

    let connection = null;

    if (database.auth && database.auth.user && database.auth.pass) {
        connection = Redis.createClient(
            'redis://${user}:${pass}@{host}:${port}'
            .replace('${user}', database.auth.user)
            .replace('${pass}', database.auth.pass)
            .replace('${host}', database.host)
            .replace('${port}', database.port),
            database.options
        );
    }

    if (!database.auth) {
        connection = Redis.createClient(database.port, database.host, database.options);
    }

    connection.on('ready', function(err) {
        dev.debug('Redis Server: Application Ready with success!'.cyan);
    });

    connection.on('reconnecting', function(err) {
        dev.debug('Redis Server: Attemp to recconect Application!'.red);
        dev.debug('Redis Server: Reconnected'.green);
    });

    connection.on('error', function(err) {
        dev.debug('Redis Server: Application error to connect, please follow the error'.red);
        dev.debug('Error: '.red, err);
        doNext(null);
    });

    connection.on('connect', function() {
        dev.debug('Redis Server: Application connected with success!'.green);
        doNext(null);
    });

    var redisStore = new RedisStore({
        client: connection,
        host:   database.host,
        port:   database.port,
        ttl:    database.session.timeout
    });

    let redisConfiguration = {
        saveUninitialized:  true,
        secret:             database.secret,
        store:              redisStore,
        resave:             true
    };

    if (process.env.COOKIE) {
        redisConfiguration.cookie = database.session.cookie;
    }

    configuration.app.use(Session(redisConfiguration));

    return connection;
};

module.exports = RedisDBConnection;
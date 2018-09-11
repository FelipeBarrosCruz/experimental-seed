'use strict';

let commander = require('commander')
    .option('-c, --cookie [status]', 'Add specific use postman cookie', false)
    .option('-l, --log [status]', 'Add the specified debug log [status]', false)
    .option('-p --port [value]', 'Add the port of server', 3000)
    .option('-r, --run [env]', 'Set enviroment [development | production]', 'development')
    .parse(process.argv);

if (commander.run) {
    process.env.NODE_ENV = commander.run;
}

if (commander.log) {
    process.env.NODE_DEBUG = true;
}

if (commander.cookie) {
    process.env.COOKIE = true;
}

let Application  = require('./src/application'),
    colors       = require('colors'),
    APP_HOST     = 'http://localhost',
    APP_PORT     = commander.port;

let onStart  = (server) => {
    let Configuration = require('./env/${ENV}'.replace('${ENV}', process.env.NODE_ENV));
    return Configuration;
};

let onFinish = (Configuration, Server) => {
    server.listen(APP_PORT, function() {
        dev.debug('Application Server started'.green);
        dev.debug('Application Server running on: '.green + '%s:%s'.yellow, APP_HOST, APP_PORT);
    });
};

let application = Application(onStart, onFinish);

module.exports = application;
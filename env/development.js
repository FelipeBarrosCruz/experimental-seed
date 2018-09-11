'use strict';

const adapter = {
    helpers:    {
        location:   '${dir}/app/helpers/*/index.js'
    },
    entity:     {
        location:   '${dir}/app/entity/*/index.js'
    },
    components: {
        location:   '${dir}/app/components/*/index.js'
    },
    security: {
        location:   '${dir}/security',
        debug:      true
    },
    routes:     {
        location:   '${dir}/app/routes/*/index.js'
    }
};

const database = {
    mongo: [{
            name: 'database.mongo-one',
            host: '127.0.0.1',
            port: 27017,
            collection: 'database_one',
            auth: {
                user: false,
                pass: false
            },
            debug: true
        }, {
            name: 'database.mongo-two',
            host: '127.0.0.1',
            port: 27017,
            collection: 'database_two',
            auth: {
                user: false,
                pass: false
            },
            debug: true
    }],
    neo4j: {
        name: 'database.neo4j',
        host: '127.0.0.1',
        port: 7474,
        auth: {
            user: 'neo4j',
            pass: '1q2w3e4r'
        }
    },
    redis: {
        name:    'database.redis',
        host:    '127.0.0.1',
        port:    6379,
        secret:  'S3CR3TK3Y',
        options: {
            timeout: 5000
        },
        session: {
            timeout: 3600,
            cookie: {
                path:    '/',
                domain:  'yourdomain.local',
                maxAge:  9000000000,
                expires: 9000000000
            }
        }
    }
};

const ENV = {
    dir: '/var/src/',
    logs: {
        status:      true,
        location:    '${dir}/logs/',
        filePattern: 'access-%DATE%.log',
        frequency:   'daily',
        verbose:     false,
        format:      'combined'
    },
    load: {
        database: database,
        adapter: adapter
    }
};

module.exports = ENV;
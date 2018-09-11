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
    routes:     {
        location:   '${dir}/app/routes/*/index.js',
        security:   'app.components.security'
    }
};

const database = {
    mongo: {
        name: 'database.mongo',
        host: '172.31.26.67',
        port: 27017,
        collection: 'boutwo',
        auth: {
            user: false,
            pass: false
        },
        debug: true
    },
    neo4j: {
        name: 'database.neo4j',
        host: '172.31.26.65',
        port: 7474,
        auth: {
            user: 'neo4j',
            pass: '1q2w3e4r'
        }
    },
    redis:{
        name:    'database.redis',
        host:    '172.31.31.116',
        port:    6973,
        secret:  'b0utw0s3cr3t',
        options: {
            timeout: 5000
        },
        session: {
            timeout: 3600,
            cookie: {
                path:    '/',
                domain:  'boutwo.com',
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
        location:    '${dir}/logs',
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
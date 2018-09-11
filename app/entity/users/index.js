'use strict';

let UsersEntity = (function(namespace) {

    return function constructor(App, Repository) {
        return Repository.set(namespace, {
            mongo: require('./mongo')(Repository),
            neo4j: require('./neo4j')(Repository)
        });
    };

})('app.entity.users');

let toInject = ['App', 'Repository', UsersEntity];
module.exports = toInject;
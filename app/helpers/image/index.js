'use strict';

let Helper = (function(namespace) {
    return function constructor(App, Repository) {
        return Repository.set(namespace, {
            save: require('./src/save')
        });
    };
})('app.helpers.image');

let Inject = ['App', 'Repository', Helper];

module.exports = Inject;
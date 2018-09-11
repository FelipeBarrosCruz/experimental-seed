'use strict';

let Helper = (function(namespace) {
    return function constructor(App, Repository) {
        return Repository.set(namespace, {
            error:   require('./src/error'),
            success: require('./src/success')
        });
    };
})('app.helpers.response');

let Inject = ['App', 'Repository', Helper];

module.exports = Inject;
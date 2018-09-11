'use strict';

let Helper = (function(namespace) {
    return function constructor(App, Repository) {
        return Repository.set(namespace, {
            save: require('./src/save')
        });
    };
})('app.components.file-upload');

let Inject = ['App', 'Repository', Helper];

module.exports = Inject;
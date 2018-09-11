'use strict';

let AmazonUpload = (function(namespace) {
    let Configuration = (() => {
        return require('./config.json');
    })();

    return function constructor(App, Repository) {
        return Repository.set(namespace, {
            get: require('./src/get')(Repository, Configuration)
        });
    };

})('app.components.amazon-media-redirect');

let Injector = ['App', 'Repository', AmazonUpload];

module.exports = Injector;
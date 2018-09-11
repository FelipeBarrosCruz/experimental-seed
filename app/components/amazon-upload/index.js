'use strict';

let AmazonUpload = (function(namespace) {
    let Configuration = (() => {
        return require('./config.json');
    })();

    return function constructor(App, Repository) {
        return Repository.set(namespace, {
            upload:     require('./src/upload')(Repository, Configuration),
            redirect:   require('./src/redirect')(Repository, Configuration)
        });
    };

})('app.components.amazon-upload');

let Injector = ['App', 'Repository', AmazonUpload];

module.exports = Injector;
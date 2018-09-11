'use strict';

let Helper = (function(namespace) {

    let Configuration = (() => {
        return require('./config.js');
    })();

    return function constructor(App, Repository) {
        return Repository.set(namespace, {
            onThumbBlur: require('./src/on-thumb-blur.js')(Repository, Configuration || {})
        });
    };
})('app.components.image-enchantments');

let Inject = ['App', 'Repository', Helper];

module.exports = Inject;
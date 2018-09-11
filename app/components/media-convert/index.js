'use strict';

let Helper = (function(namespace) {

    let Configuration = (() => {
        return require('./config.json');
    })();

    return function constructor(App, Repository) {
        return Repository.set(namespace, {
            image: require('./src/image')(Repository, Configuration.image || {}),
            video: require('./src/video')(Repository, Configuration.video || {}),
            audio: require('./src/audio')(Repository, Configuration.audio || {})
        });
    };
})('app.components.media-convert');

let Inject = ['App', 'Repository', Helper];

module.exports = Inject;
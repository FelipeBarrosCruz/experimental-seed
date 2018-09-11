'use strict';

let Get = (Repository, Configuration) => {

    let getMediaType = (type) => {
        let mediaTypes = {
            1: 'image',
            2: 'video',
            3: 'audio'
        };
        return mediaTypes[type];
    };

    let formatURL = (configuration) => {
        return [Configuration.url].concat(configuration).join('/').replace(/\/\//g, '');
    }

    return (Media) => {
        if (!Media || Media && !Media.src || !Media.type) {
            return null;
        }

        return formatURL([getMediaType(Media.type), Media.src]);
    };
};

module.exports = Get;
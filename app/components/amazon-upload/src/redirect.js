'use strict';

let ComponentAction = (Repository, Configuration) => {
    let AmazonS3        = Repository.require('s3'),
        AmazonClient    = AmazonS3.createClient(Configuration.client);

    let getMediaType = (type) => {
        let mediaTypes = {
            1: 'image',
            2: 'video',
            3: 'audio'
        };
        return mediaTypes[type];
    };

    let formatURL = (configuration) => {
        return AmazonClient.getPublicUrl(Configuration.bucket.name, configuration.join('/').replace(/\/\//g, ''));
    }

    return (Media) => {
        if (!Media || Media && !Media.src || !Media.type) {
            return null;
        }

        return formatURL([getMediaType(Media.type), Media.src]);
    };
};

module.exports = ComponentAction;
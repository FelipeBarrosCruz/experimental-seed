'use strict';

let Video = (Repository, Configuration) => {
    let ffmpeg = require('fluent-ffmpeg'),
        Utils  = require('./utils');

    return (configuration, callback) => {
        let FilePath = Utils.getFilePath(configuration);

        let converted = ffmpeg(FilePath.input)
            .videoCodec(Configuration.videoCodec)
            .aspect(Configuration.aspect)
            .size(Configuration.size)
            .audioCodec(Configuration.audioCodec)
            .format(Configuration.format)
            .on('end', () => {
                return callback(true, configuration);
            })
            .on('error', (err) => {
                console.log('some error happend', err);
                return callback((err) ? false : true, configuration);
            })
            .save(FilePath.output);

        return converted;
    };
};

module.exports = Video;
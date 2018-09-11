'use strict';

let Image = (Repository, Configuration) => {
    let ImageMagick = Repository.require('imagemagick'),
        Utils       = require('./utils');

    return (configuration, callback) => {
        let FilePath = Utils.getFilePath(configuration);
        return ImageMagick.resize({
            srcPath: FilePath.input,
            dstPath: FilePath.output,
            width:   Configuration.width,
            heigth:  Configuration.heigth
        }, function onResize(err, stdout, sdterr) {
            return callback((err) ? false : true, configuration);
        });
    };
};

module.exports = Image;
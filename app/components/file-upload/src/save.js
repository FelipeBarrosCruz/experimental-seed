'use strict';
let imageUtils = require('./utils'),
    fileSystem = require('fs');

let Save = function(configuration, callback) {

    let imageBuffer = configuration.img.buffer,
        imageExt    = configuration.img.ext,
        fileName    = '${name}.${ext}'
                        .replace('${name}', imageUtils.formatImageName(configuration.data))
                        .replace('${ext}', imageExt),
        filePath    = configuration.dir.concat('/').concat(fileName);

    if (typeof callback === 'function') {
        return fileSystem.writeFile(filePath, imageBuffer, configuration.charset, function onResponse(err) {
            return callback((err ? false : true), {
                filePath: filePath,
                fileName: fileName,
                imageExt: imageExt
            });
        });
    }

    if (typeof callback === 'undefined') {
        fs.writeFileSync(filePath, imageBuffer, (image.charset || 'utf8'));
        return {
            filePath: filePath,
            fileName: fileName,
            imageExt: imageExt
        };
    }
}

module.exports = Save;

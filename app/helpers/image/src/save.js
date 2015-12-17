'use strict';
let imageUtils = require('./utils'),
    fileSystem = require('fs');

let SaveImage = function(configuration, callback) {
    let imageBuffer = configuration.img.data,
        imageType   = configuration.img.type,
        imageExt    = imageUtils.getMime() && imageUtils.getMime().extension(imageType),
        fileName    = '${name}.${ext}'
            .replace('${name}', imageUtils.formatImageName(configuration.data))
            .replace('${ext}', imageExt),
        filePath    = configuration.dir.concat('.').concat(fileName);

    if (typeof callback === 'function') {
        return fileSystem.writeFile(filePath, imageBuffer, configuration.charset, function onResponse() {
            callback({
                filePath: filePath,
                fileName: fileName,
                imageExt: imageExt
            });
        });
    }

    fs.writeFileSync(filePath, imageBuffer, (image.charset || 'utf8'));
    return {
        filePath: filePath,
        fileName: fileName,
        imageExt: imageExt
    };
}

module.exports = SaveImage;

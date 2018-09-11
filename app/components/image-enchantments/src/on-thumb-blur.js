'use strict';

let Run = (Repository, Configuration) => {
    let GraphicsMagick = Repository.require('gm');

    let convertToBase64 = (buffer) => {
        return 'data:image/png;base64,'.concat(buffer.toString('base64'));
    };

    let convertBufferByEncoding = (encoding, buffer) => {
        let Actions = {
            base64: convertToBase64
        };

        return encoding && Actions[encoding](buffer) || buffer;
    };

    return (configuration, callback) => {
        let resizeX = Configuration.width(configuration.width),
            resizeY = Configuration.heigth(configuration.heigth);

        let Image = GraphicsMagick(configuration.file)
            .blur(30, 20)
            .resize(resizeX, resizeY)
            .autoOrient();


        if (!configuration.output) {
            return callback(false, new Error('Doest have output'));
        }

        if (configuration.output.buffer) {
            return Image.toBuffer(Configuration.mimetype, function(err, buffer) {
                let status  = err
                            ? false
                            : true,
                    result  = convertBufferByEncoding(configuration.output.encoding, buffer);

                return callback(true, result);
            });
        }

        return callback(false, new Error('Doest have valid output'));
    };
};

module.exports = Run;
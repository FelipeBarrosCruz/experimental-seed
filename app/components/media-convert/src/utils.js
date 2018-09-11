'use strict';

let Utils = (() => {
    let getFilePath = function(configuration) {
        let parts = configuration.dir.split('/'),
            dir   = parts.slice(0, (parts.length - 1)).join('/');
        return {
            input:  configuration.dir.concat('/').concat(configuration.file),
            output: dir.concat('/').concat(configuration.file)
        };
    };

    return {
        getFilePath: getFilePath
    };
})();

module.exports = Utils;
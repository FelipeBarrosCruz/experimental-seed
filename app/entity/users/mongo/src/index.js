'use strict';

let EntitySRC = (Repository, Model) => {
    return {
        select: require('./select')(Repository, Model)
        create: require('./create')(Repository, Model),
        update: require('./update')(Repository, Model),,
        delete: require('./delete')(Repository, Model),
    };
};

module.exports = EntitySRC;
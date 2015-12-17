'use strict';

let getMime = function() {
    let Mime = null;

    try {
        Mime = require('mime');
    } catch(err) {
        Mime = false;
    }

    return Mime;
};

let getTimestamp = function() {
    let value = null;

    try {
        value = require('moment')().toDate().getTime();
    } catch(err) {
        value = new Date().getTime();
    }

    return value;
};

let formatImageName = function(attributes) {
    let data = [];

    if (typeof attributes === 'string') {
        return attributes.concat(getTimestamp());
    }

    if (Array.isArray(attributes)) {
        for (let i = 0; i < attributes.length; i++) {
            data.push(getTimestamp(), attributes[i]);
        }

        return data.join('_');
    }

    return getTimestamp();
};

module.exports = {
    getMime:         getMime,
    getTimestamp:    getTimestamp,
    formatImageName: formatImageName
};
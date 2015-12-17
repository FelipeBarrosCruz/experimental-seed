'use strict';

let Router = {
    media: [{
        method: 'POST',
        url:    '/attachment/',
        api:    'attachment'
    }, {
        method: 'GET',
        url:    '/:name?',
        api:    'select'
    }]
};

module.exports = Router;

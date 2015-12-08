'use strict';

let Router = {
    example: [{
        method: 'GET',
        url: '/foo/:bar',
        api: 'fooBar'
    }, {
        method: 'GET',
        url: '/bar/:foo',
        api: 'barFoo'
    }]
};

module.exports = Router;

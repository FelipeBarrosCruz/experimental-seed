'use strict';

let Router = {
    example: [{
        method: 'GET',
        url: '/say/hello',
        api: 'sayHello'
    }, {
        method: 'GET',
        url: '/say/bye',
        api: 'sayBye'
    }]
};

module.exports = Router;

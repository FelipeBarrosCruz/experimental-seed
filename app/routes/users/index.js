'use strict';

let Router = {
    users: [{
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

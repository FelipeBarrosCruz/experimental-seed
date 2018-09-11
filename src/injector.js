'use strict';

let Injector = function(Repository) {

    let register = function(args) {
        let argsLength  = args.length;

        if (!argsLength) {
            return;
        }

        let midleware = argsLength && Array.isArray(args) && (args.splice((argsLength - 1), 1))[0];

        if (typeof midleware !== 'function') {
            throw 'Cannot inject, please check the syntax!';
        }

        let toInject = [];

        for(let i = 0; i < argsLength; i++) {
            if (Array.isArray(args[i]) && !args[i].length || !args[i] || args[i] !== undefined && !Repository.exists(args[i])) {
                continue;
            }
            toInject.push(Repository.get(args[i]));
        }

        return midleware.apply(midleware, toInject);
    };

    return {
        register: register
    };
};;

module.exports = Injector;
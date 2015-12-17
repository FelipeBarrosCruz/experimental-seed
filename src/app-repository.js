'use strict';

let AppRepository = (function() {

    let container = {};

    let Repository = function(splits, create, context) {
        let result = context || container;
        for(let i = 0, s; result && (s = splits[i]); i++) {
            result = (s in result ? result[s] : (create ? result[s] = {} : undefined));
        }
        return result;
    };

    return {
        set: function(name, value, context) {
            let splits = name.split('.'), s = splits.pop(), result = Repository(splits, true, context);
            return result && s ? (result[s] = value) : undefined;
        },
        get: function(name, create, context) {
            return Repository(name.split('.'), create, context);
        },
        require: function(name) {
            if (this.exists(name)) {
                return this.get(name);
            }

            let response = null;

            try {
                response = this.set(name, require(name));
            } catch(err) {
                if (err.code == 'MODULE_NOT_FOUND') {
                   return dev.debug('Package'.red + ' [%s] '.yellow + 'required doest exist'.red, name);

                }
                throw err;
            }

            return response;
        },
        exists: function(name, context) {
            return this.get(name, false, context) !== undefined;
        }
    };

})();

module.exports = AppRepository;
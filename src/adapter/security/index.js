'use strict';

let EntityAdapter = function(configuration) {
    let App         = configuration.app,
        Repository  = configuration.repository,
        Injector    = configuration.injector,
        Location    = configuration.location.replace('${dir}', configuration.dir);

    try {
        let Security = Injector.register(Repository.require(Location));
        Security((module) => {
            Repository.set('app.security', module);
            return configuration.doNext(null);
        });
    } catch (err) {
        dev.debug('Error load security module'.red);
        throw err;
    }
};

module.exports = EntityAdapter;
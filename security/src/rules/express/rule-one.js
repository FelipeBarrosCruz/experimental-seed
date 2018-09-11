module.exports = ['App', 'Repository', (App, Repository) => {

    return (req, res, next) => {
        dev.debug('PASSSOU POR AQUI AUAUHHAU');
        return res.end('para ai porra');
        // next(null);
    };
}];
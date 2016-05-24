var connection = require('./mysqlConnection');

module.exports = function(req, res, next) {
    var genreQuery = 'SELECT * FROM genres';
    connection.query(genreQuery, function(err, genres) {
        res.locals.genreList = genres;
    });
    next();
};
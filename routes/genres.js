var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');

router.get('/', function(req, res, next) {
    var genreId = req.params.genre_id;
    var genreIdQuery = 'SELECT *, DATE_FORMAT (created_at, \'%Y-%m-%d %k:%i\') AS created_at FROM boards B LEFT JOIN genres G ON B.genre_id = G.genre_id';
    connection.query(genreIdQuery, function(err, selectBoardList) {
        res.render('genres', {
            title: 'genre',
            selectBoardList: selectBoardList
        });
    });
});

router.get('/:genre_id', function(req, res, next) {
    var genreId = req.params.genre_id;
    var genreIdQuery = 'SELECT *, DATE_FORMAT (created_at, \'%Y-%m-%d %k:%i\') AS created_at FROM boards B LEFT JOIN genres G ON B.genre_id = G.genre_id WHERE B.genre_id = ' + genreId;
    connection.query(genreIdQuery, function(err, selectBoardList) {
        res.render('genres', {
            title: 'genre',
            selectBoardList: selectBoardList
        });
    });
});

module.exports = router;
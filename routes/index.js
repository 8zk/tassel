var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection');

/* GET home page. */
router.get('/', function(req, res, next) {
    var query = 'SELECT *, DATE_FORMAT (created_at, \'%Y-%m-%d %k:%i\') AS created_at FROM boards';
    var genreQuery = 'SELECT * FROM genres';
    connection.query(query, function(err, rows) {
        connection.query(genreQuery, function(err, genres) {
            res.render('index', {
                title: 'Tassel',
                boardList: rows,
                genreList: genres
            });
        });
    });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection');

router.get('/', function(req, res, next) {
    var query = 'SELECT *, DATE_FORMAT (created_at, \'%Y-%m-%d %k:%i\') AS created_at FROM boards LEFT JOIN genres ON boards.genre_id = genres.genre_id';
    connection.query(query, function(err, rows) {
        res.render('index', {
            title: 'Tassel',
            boardList: rows,
        });
    });
});

module.exports = router;

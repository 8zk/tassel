var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection');
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: './public/images/uploads/' });

router.get('/', function(req, res, next) {
    var boardId = req.params.board_id;
    var getAuthorQuery = 'SELECT * FROM authors';
    var getBoardQuery = 'SELECT * FROM boards WHERE board_id = ' + boardId;
    connection.query(getBoardQuery, function(err, rows) {
        connection.query(getAuthorQuery, function(err, authors) {
            res.render('create', {
                title: '記事投稿',
                board: rows,
                authors:  authors
            });
        });
    });
});

router.post('/', upload.single('image_file'), function(req, res, next) {
    var title = req.body.board_title;
    var article = req.body.article;
    var genreId = req.body.genre_id;
    var authorId = req.body.author_id;
    var imagePath = '/images/uploads/' + req.file.filename + '.png';
    var createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
    var query = 'INSERT INTO boards (genre_id, board_title, article, created_at, image_path, author_id) VALUES ("' + genreId + '", "' + title + '", "' + article + '", "' + createdAt + '", "' + imagePath + '", "' + authorId + '")';
    connection.query(query, function(err, rows) {
        res.redirect('/');
    });
});

module.exports = router;
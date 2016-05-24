var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var moment = require('moment');
var nl2br  = require('nl2br');

router.get('/:board_id', function(req, res, next) {
    var boardId = req.params.board_id;
    var getBoardQuery = 'SELECT *, DATE_FORMAT (created_at, \'%Y-%m-%d %k:%i\') AS created_at FROM boards WHERE board_id = ' + boardId;
    var getAuthorQuery = 'SELECT * FROM authors INNER JOIN boards ON authors.author_id = boards.author_id WHERE boards.board_id = ' + boardId;
    var query ='SELECT *, DATE_FORMAT (created_at, \'%Y-%m-%d %k:%i\') AS created_at FROM boards LEFT JOIN genres ON  boards.genre_id = genres.genre_id'
    connection.query(getBoardQuery, function(err, board) {
        connection.query(getAuthorQuery, function(err, author) {
            connection.query(query, function(err, rows) {
                board[0].article = nl2br(board[0].article);
                res.render('board', {
                    title: board[0].board_title,
                    board: board[0],
                    img: board[0].image_path,
                    board_id: board[0].board_id,
                    author: author[0].author,
                    boardList: rows,
                });
            });
        });
    });
});

router.post('/:board_id', function(req, res, next) {
    var message = req.body.message;
    var boardId = req.params.board_id;
    var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    var query = 'INSERT INTO messages (message, board_id, created_at) VALUES ("' + message + '", "' + boardId + '", "' + createdAt + '")';
    console.log(query);
    connection.query(query, function(err, rows) {
        res.redirect('/boards/' + boardId);
    });
});

module.exports = router;
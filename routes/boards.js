var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var moment = require('moment');

router.get('/:board_id', function(req, res, next) {
    var boardId = req.params.board_id;
    var getBoardQuery = 'SELECT *, DATE_FORMAT (created_at, \'%Y-%m-%d %k:%i\') AS created_at FROM boards WHERE board_id = ' + boardId;
    var getAuthorQuery = 'SELECT * FROM authors INNER JOIN boards ON authors.author_id = boards.author_id WHERE boards.board_id = ' + boardId;
    connection.query(getBoardQuery, function(err, board) {
        connection.query(getAuthorQuery, function(err, author) {
            res.render('board', {
                title: board[0].board_title,
                board: board[0],
                img: board[0].image_path,
                board_id: board[0].board_id,
                author: author[0].author
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
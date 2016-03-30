var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var moment = require('moment');

router.get('/', function(req, res, next) {
    res.render('register', {
        title: '新規会員登録'
    });
});
router.post('/', function(req, res, next) {
    var userName = req.body.user_name;
    var password = req.body.password;
    var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    var query = 'INSERT INTO users (user_name, password, created_at) VALUES ("' + userName + '", ' + '"' + password + '", ' + '"' + createdAt + '")';
    connection.query(query, function(err, rows) {
        res.redirect('/login');
    });
});

module.exports = router;
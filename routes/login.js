var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');

router.get('/', function(req, res, next) {
    if (req.session.user_id) {
        res.redirect('/');
    } else {
        res.render('login', {
            title: 'ログイン'
        });
    }
});
router.post('/', function(req, res, next) {
    var password = req.body.password;
    var userName = req.body.user_name;
    var query = 'SELECT user_id FROM users WHERE user_name = "' + userName + '" AND password = "' + password + '" LIMIT 1';
    console.log(query);
    connection.query(query, function(err, rows) {
        var userId = rows.length? rows[0].user_id: false;
        if (userId) {
            req.session.user_id = userId;
            res.redirect('/');
        } else {
            res.render('login', {
                title: 'ログイン',
                noUser: 'ユーザー名とパスワードが一致するユーザーはいません'
            });
        }
    });
});
module.exports = router;
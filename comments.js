// Create web server

var express = require('express');
var router = express.Router();
var comments = require('../model/comments.js');

// GET /comments
router.get('/', function(req, res) {
    comments.getComments(function(err, comments) {
        if (err) {
            return res.status(500).send('Error occurred: database error.');
        }
        res.render('comments', { comments: comments });
    });
});

// POST /comments
router.post('/', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var comment = req.body.comment;

    comments.insertComment(name, email, comment, function(err) {
        if (err) {
            return res.status(500).send('Error occurred: database error.');
        }
        res.redirect('/comments');
    });
});

module.exports = router;
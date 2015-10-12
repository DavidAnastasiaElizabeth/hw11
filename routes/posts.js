var express = require('express');
var config = require('../config');
var orch = require('orchestrate');
var db = orch(config.dbkey);
var router = express.Router();

// requires a user to be logged in
function requireSession(req, res, next) {
  if (!req.session.user) {
    res.redirect('/');
  } else {
    next();
  }
}

// Posts Routes
// ---------------
router.get('/main', requireSession, function(req, res) {
  res.render('main', { title: 'Get Chirping!', user: req.session.user, stylesheet: '/stylesheets/main.css' });
});

router.get('/', requireSession, function(req, res, next) {
  db.list('posts').then(function(result) {
    var posts = [];
    for (var i = 0; i < result.body.results.length; i++) {
      posts.push(result.body.results[i].value)
    }
    res.send(posts);
  })
});

router.post('/', requireSession, function(req, res, next) {
  db.post('posts', {
    "title": req.body.title,
    "author": req.body.author,
    "content": req.body.content,
    "timestamp": req.body.timestamp
  }).then(function(result) {
    console.log('Posted');
  });
});

router.get('/recent', requireSession, function(req, res, next) {
  db.list('posts').then(function(result) {
    var posts = [];
    for (var i = 0; i < result.body.results.length; i++) {
      posts.push(result.body.results[i].value)
    }
    res.send(posts.slice(-3));
  })
});

router.get('/:username', requireSession, function(req, res, next) {
  db.list('posts').then(function(result) {
    var posts = [];
    for (var i = 0; i < result.body.results.length; i++) {
      if (result.body.results[i].value.author === req.params.username) {
        posts.push(result.body.results[i].value)
      }
    }
    res.send(posts.slice(-3));
  });
});

module.exports = router;

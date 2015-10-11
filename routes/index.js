var express = require('express');
var config = require('../config');
var orch = require('orchestrate');
var db = orch(config.dbkey);
var router = express.Router();

// Login Routes
// ---------------
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Log In to Hermit', stylesheet: '/stylesheets/login.css' });
});

router.post('/', function(req, res, next) {
  db.search('users', 'value.username: ' + req.body.username).then(function (result) {
    if (result.body.results[0].value.password === req.body.password) {
      req.session.user = result.body.results[0].value;
      res.render('main', { title: 'Get Chirping!', user: req.session.user, stylesheet: '/stylesheets/main.css' });
    } else {
      console.log('Username or password incorrect');
      res.render('login', { title: 'Log In to Hermit', stylesheet: '/stylesheets/login.css' });
    }
  }).fail(function(err) {
    res.send(err);
  })
});

router.delete('/logout', function(req, res) {
  delete req.session;
});

// Register Routes
// ---------------
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Sign Up' });
});

router.post('/users', function(req, res, next) {
  var usernameAvailable = true;
  db.search('users', 'value.username: ' + req.body.username).then(function (result) {
    if (result.body.count > 0) {
      console.log('Username taken');
      res.redirect('/register');
    } else {
      db.post('users', {
        "username": req.body.username,
        "password": req.body.password,
        "bio": req.body.bio
      }).then(function(result) {
        console.log('Created User Successfully');
        res.redirect('/');
      })
    }
  }).fail(function(err) {
    res.send(err);
  });
});

//post routes

router.get('/posts', function(req, res, next) {
  db.list('posts').then(function(result) {
    var posts = [];
    for (var i = 0; i < result.body.results.length; i++) {
      posts.push(result.body.results[i].value)
    }
    res.send(posts);
  })
  //console.log(database.posts.splice(-3, database.posts.length -1));
});

router.post('/posts', function(req, res, next) {
  db.post('posts', {
    "title": req.body.title,
    "author": req.body.author,
    "content": req.body.content,
    "timestamp": req.body.timestamp
  }).then(function(result) {
    console.log('Posted');
  });
});

router.get('/posts/recent', function(req, res, next) {
  db.list('posts').then(function(result) {
    var posts = [];
    for (var i = 0; i < result.body.results.length; i++) {
      posts.push(result.body.results[i].value)
    }
    res.send(posts.slice(-3));
  })
  //console.log(database.posts.splice(-3, database.posts.length -1));
});

router.get('/posts/:username', function(req, res, next) {
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

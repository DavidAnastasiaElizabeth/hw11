var express = require('express');
var database = require('../database');
var config = require('../config');
var orch = require('orchestrate');
var db = orch(config.dbkey);
var router = express.Router();

// Login Routes
// ---------------
router.get('/', function(req, res, next) {
  console.log('this login page is rendering');
  res.render('login', { title: 'Log In to Hermit', stylesheet: '/stylesheets/login.css' });
});

router.post('/', function(req, res, next) {
  for (var i = 0; i < database.users.length; i++) {
    if (database.users[i].username === req.body.username && database.users[i].password === req.body.password) {
      res.render('main', { title: 'Hermit App', user: database.users[i], stylesheet: '/stylesheets/main.css' });
    } else if (i === database.users.length - 1) {
      console.log('Username or password incorrect');
      res.render('login', { title: 'Log In to Hermit', stylesheet: '/stylesheets/login.css' });
    }
  }
});

// Register Routes
// ---------------
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Sign Up' });
});

router.post('/users', function(req, res, next) {
  var usernameAvailable = true;
  for (var i = 0; i < database.users.length; i++) {
    if (req.body.username === database.users[i].username) {
      usernameAvailable = false;
    }
  }
  if (usernameAvailable) {
    var user = {
      username: req.body.username,
      password: req.body.password,
      bio: req.body.bio
    }

    database.users.push(user);
    res.redirect('/');
  } else {
    console.log('Username taken');
    res.redirect('/register');
  }

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

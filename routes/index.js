var express = require('express');
var database = require('../database');
var config = require('./config');
var orch = require('orchestrate');
var db = orch(config.dbkey);
var router = express.Router();

// Login Routes
// ---------------
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Log In to Hermit' });
});

router.post('/', function(req, res, next) {
  for (var i = 0; i < database.users.length; i++) {
    if (database.users[i].username === req.body.username && database.users[i].password === req.body.password) {
      res.render('main', { title: 'Hermit App', user: database.users[i] });
    } else if (i === database.users.length - 1) {
      console.log('Username or password incorrect');
      res.render('login', { title: 'Log In to Hermit' });
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
  db.post('posts', {
    "title": req.body.title,
    "author": req.body.author,
    "timestamp": Date.now()
  }).then(function(result) {
    console.log('Posted');
  });
});

router.post('/posts', function(req, res, next) {
  res.send(database.posts);
  //console.log(database.posts.splice(-3, database.posts.length -1));
});

router.get('/posts/recent', function(req, res, next) {
  res.send(database.posts.slice(-3));
  //console.log(database.posts.splice(-3, database.posts.length -1));
});

router.get('/posts/:username', function(req, res, next) {
  var usersPosts = [];
  for (var i = 0; i < database.posts.length; i++) {
    if (database.posts[i].author === req.params.username) {
      usersPosts.push(database.posts[i]);
    }
  }
  res.send(usersPosts);
  console.log(usersPosts);
});


module.exports = router;

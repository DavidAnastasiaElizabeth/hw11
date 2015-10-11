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
  db.list('users').then(function(result) {
    for (var i = 0; i < result.body.count; i++) {
      if (result.body.results[i].value.username === req.body.username && result.body.results[i].value.password === req.body.password) {
        req.session.user = result.body.results[i].value;
        res.render('main', { title: 'Hermit App', user: req.session.user, stylesheet: '/stylesheets/main.css' });
      } else if (i === result.body.count - 1) {
        console.log('Username or password incorrect');
        res.render('login', { title: 'Log In to Hermit', stylesheet: '/stylesheets/login.css' });
      }
    }
  })
});

router.delete('/logout', function(req, res) {
  delete req.session;
})

// Register Routes
// ---------------
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Sign Up' });
});

router.post('/users', function(req, res, next) {
  var usernameAvailable = true;
  db.list('users').then(function(result) {
    for (var i = 0; i < result.body.count; i++) {
      if (req.body.username === result.body.results[i].value.username) {
        usernameAvailable = false;
      } else if ((i === result.body.results.length -1) && usernameAvailable) {
        db.post('users', {
          "username": req.body.username,
          "passsword": req.body.password,
          "bio": req.body.bio
        }).then(function(result) {
          console.log('Created User Successfully');
          res.redirect('/');
        })
      } else if ((i === result.body.count -1) && !usernameAvailable) {
        console.log('Username taken');
        res.redirect('/register');
      }
    }
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

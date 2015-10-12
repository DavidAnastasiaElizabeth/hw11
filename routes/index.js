var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('../config');
var orch = require('orchestrate');
var db = orch(config.dbkey);
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

// Login Routes
// ---------------
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Log In to Hermit', stylesheet: '/stylesheets/login.css' });
});

router.post('/', function(req, res, next) {
  db.search('users', 'value.username: ' + req.body.username).then(function (result) {
    if (result.body.results[0].value.password === req.body.password) {
      req.session.user = result.body.results[0].value;
      req.session.key = result.body.results[0].path.key;
      res.redirect('/main');
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

// User Routes
// ---------------
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Sign Up', stylesheet: '/stylesheets/register_edit.css' });
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

router.get('/users/:id/edit', function(req, res, next) {
  res.render('edit-user', { title: 'Edit User', stylesheet: '/stylesheets/register_edit.css' });
});

router.put('/users/:id/edit', function(req, res, next) {
  db.put('users', req.params.id, {
    "username": req.body.username,
    "bio": req.body.bio,
    "password": req.body.password
  }).then(function(result) {
    req.session.user = {"username": req.body.username,
    "bio": req.body.bio,
    "password": req.body.password};
    console.log('Edited User');
    res.redirect('/main');
  });
});

// Posts Routes
// ---------------
router.get('/main', function(req, res) {
  res.render('main', { title: 'Get Chirping!', user: req.session.user, stylesheet: '/stylesheets/main.css' });
});

router.get('/posts', function(req, res, next) {
  db.list('posts').then(function(result) {
    var posts = [];
    for (var i = 0; i < result.body.results.length; i++) {
      posts.push(result.body.results[i].value)
    }
    res.send(posts);
  })
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

// Other Routes
// ---------------
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Why Hermit?' });
});


module.exports = router;

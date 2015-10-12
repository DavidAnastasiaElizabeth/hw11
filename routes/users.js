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

// requires a user to be logged in
function requireSession(req, res, next) {
  if (!req.session.user) {
    res.redirect('/');
  } else {
    next();
  }
}

// User Routes
// ---------------
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Sign Up', stylesheet: '/stylesheets/register_edit.css' });
});

router.post('/', function(req, res, next) {
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

router.get('/:id/edit', requireSession, function(req, res, next) {
  res.render('edit-user', { title: 'Edit User', stylesheet: '/stylesheets/register_edit.css' });
});

router.put('/:id/edit', requireSession, function(req, res, next) {
  db.put('users', req.params.id, {
    "username": req.body.username,
    "bio": req.body.bio,
    "password": req.body.password
  }).then(function(result) {
    req.session.user = {"username": req.body.username,
    "bio": req.body.bio,
    "password": req.body.password};
    console.log('Edited User');
    res.redirect('/posts/main');
  });
});


module.exports = router;

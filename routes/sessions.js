var express = require('express');
var bodyParser = require('body-parser');
var config = require('../config');
var orch = require('orchestrate');
var db = orch(config.dbkey);
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

// Session Routes
// ---------------
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Log In to Hermit', stylesheet: '/stylesheets/login.css' });
});

router.post('/', function(req, res, next) {
  db.search('users', 'value.username: ' + req.body.username).then(function (result) {
    if (result.body.results[0].value.password === req.body.password) {
      req.session.user = result.body.results[0].value;
      req.session.key = result.body.results[0].path.key;
      res.redirect('/posts/main');
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

module.exports = router;

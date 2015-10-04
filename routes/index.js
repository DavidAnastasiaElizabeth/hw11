var express = require('express');
var database = require('../database');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login to Hermit' });
});

router.post('/', function(req, res, next) {
  console.log(req.body.username);
});


module.exports = router;

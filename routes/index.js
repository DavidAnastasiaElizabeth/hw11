var express = require('express');
var database = require('../database');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login to Hermit' });
});

router.post('/', function(req, res, next) {
  console.log(req.body.username);
  for(var i = 0; i<database.users.length; i++){
    if(database.users[i].username === req.body.username && database.users[i].password === req.body.password){
        res.render('main', { title: 'Hermit App', user: database.users[i]});
      }
  }
  alert('that is wrong and you suck.');
});


module.exports = router;

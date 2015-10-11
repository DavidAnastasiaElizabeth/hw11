var config = require('./config');
var orch = require('orchestrate');
var db = orch(config.dbkey);

db.deleteCollection('users').then(function() {
  db.post('users', {
    username:'Anastasia',
    password:'doglady',
    bio:'dog lover, pizza eater.'
  }).then(function(result) {
    console.log('User created with id: ' + result.path.key);
  });

  db.post('users', {
    username:'Elizabeth',
    password:'catlady',
    bio:'cat lover, cookie eater.'
  }).then(function(result) {
    console.log('User created with id: ' + result.path.key);
  });

  db.post('users', {
    username:'David',
    password:'1',
    bio:'Secretly a shadow dragon.'
  }).then(function(result) {
    console.log('User created with id: ' + result.path.key);
  });
});

db.deleteCollection('posts').then(function() {
  db.post('posts', {
    title:'Twitter is okay...TEAM DAE TWITTER is AmAzInG',
    content: 'Just doing some stuff',
    author:'David',
    timestamp: Date.now()
  }).then(function(result) {
    console.log('Post created with id: ' + result.path.key);
  });

  db.post('posts', {
    title:'Twitter should honstly consider a rebuild based on this model',
    content: 'Just doing some stuff',
    author:'Anastasia',
    timestamp: Date.now()
  }).then(function(result) {
    console.log('Post created with id: ' + result.path.key);
  });

  db.post('posts', {
    title:'Team DAE Twitter rules',
    content: 'Just doing some stuff',
    author:'Elizabeth',
    timestamp: Date.now()
  }).then(function(result) {
    console.log('Post created with id: ' + result.path.key);
  });

  db.post('posts', {
    title:'Team Dae is going to participate in a clone-a-thon',
    content: 'Just doing some stuff',
    author:'David',
    timestamp: Date.now()
  }).then(function(result) {
    console.log('Post created with id: ' + result.path.key);
  });

  db.post('posts', {
    title:'Twitter...more like DAEitter',
    content: 'Just doing some stuff',
    author:'Anastasia',
    timestamp: Date.now()
  }).then(function(result) {
    console.log('Post created with id: ' + result.path.key);
  });

});

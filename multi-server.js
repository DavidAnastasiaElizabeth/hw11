
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use(express.static(__dirname));//Current Directory

// var app = {};

var users = [
	{username: ''},
	{username:'Anastasia'},
	{username:'Elizabeth'},
	{username:'David'}
];

var tasks = [
      { Tweet:'Twitter is okay...TEAM DAE TWITTER is AmAzInG',
        author:    'David',
        status:     'unassigned'
      },
      { Tweet:'Twitter should honstly consider a rebuild based on this model',
        author:    'Anastasia',
        status:     'unassigned'
      },
      { Tweet:'Team DAE Twitter rules',
        author:    'Elizabeth',
        status:     'unassigned'
      },
      { Tweet:'Team Dae is going to participate in a clone-a-thon',
        author:    'David',
        status:     'unassigned'
      },
      { Tweet:'Twitter...more like DAEitter',
        author:    'Anastasia',
        status:     'unassigned'
      }
	];

app.get("/users", function(req, res){
	console.log("this is a GET request to /users");
	console.log(req.body);
	res.send(users);
});

app.get("/tweets", function(req, res){
	console.log("this is a GET request to /tweets");
  res.send(tasks);
});
// function showData(collname) { //collname = "collection name"
// 	console.log(collname+' data store is now: ', database[collname]);
// }
//
// function getOne(collname) {
// 	app.get('/'+collname+'/:id', function (req, res) {
// 		var id = req.params.id;
// 		console.log('Sending model #%s...',id);
// 		res.send(database[collname][id]);
// 	});
// }//get requests happen when you load a page.
//
// function putOne(collname) {
// 	app.put('/'+collname+'/:id', function (req, res) {
// 		var id = req.params.id;
// 		console.log('Receiving model #%s...',id);
// 		database[collname][id] = req.body;
// 		showData(collname);
// 		res.send({});
// 	});
// }//updates an existing record
//
// function postOne(collname) {
// 	app.post('/'+collname, function (req, res) {
// 		console.log('Receiving new model...');
// 		var newid = collname.length;
// 		console.log('Assigning id of %s',newid);
// 		var obj = req.body;
// 		obj.id = newid;
// 		database[collname][newid] = obj;
// 		showData(collname);
// 		res.send(obj);
// 	});
// }//creates a brand new record
//
// function getAll(collname) {
// 	app.get('/'+collname, function (req, res) {
// 		console.log('Sending all models...');
// 		showData(collname);
// 		res.send(database[collname]);
// 	});
// }
//
// function makeRoutes(collname) {
// 	getOne(collname);
// 	postOne(collname);
// 	putOne(collname);
// 	getAll(collname);
// }
//
// Object.keys(database).forEach(makeRoutes);
// //way to list all the keys to an object
//
app.listen(3000, function(){
	console.log("server is running");
});
// Object.keys(database).forEach(showData);

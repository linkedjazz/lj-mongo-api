var cluster = require('cluster');

if (cluster.isMaster) {

  var numCPUs = require('os').cpus().length;

  //for (var i = 0; i < 1; i++) {
    cluster.fork();
  //}

  cluster.on('exit', function() {
    console.log('A worker process died, restarting...');
    cluster.fork();
  });


} else {


	// var JSONAPISerializer = require('jsonapi-serializer');

	var express = require('express');
	var serveStatic = require('serve-static')
	var bodyParser = require('body-parser')

	var db = require(__dirname + '/lib/db.js')
	var app = express()

	app.use(bodyParser.json())

	app.db = db



	require('./lib/umbra')(app)

	//routes
	require('./routes/umbra')(app)


	db.databaseConnect()


	app.all('*', function(req, res, next) {
	  res.header('Access-Control-Allow-Origin', '*');
	  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	  res.header('Access-Control-Allow-Headers', 'Content-Type');
	  next();
	});



	app.get('/', function(req, res) {
		res.send(':) YAY! ' );
	});




	var server = app.listen(5555, function() {
		console.log('Server started on port 5555');
	});




}


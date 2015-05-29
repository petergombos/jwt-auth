var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var cors = require("cors");
var fs = require("fs");
var pkg = JSON.parse(fs.readFileSync('./package.json'));

// CORS support for cross domain ajax calls and json request body parsing
app.use(cors(), bodyParser.json(),function(err,req,res,next){
	console.log(err);
	res.status(400).send({error : "Invalid json supplied in request body"});
});

// Basic info about this service
app.get("/", function(req, res) {
	res.send({
		name: pkg.name,
		version: pkg.version,
		description: pkg.description,
		repository: pkg.repository.url
	});
});


// Auth
var jwt = require('jsonwebtoken');
var privateKey = fs.readFileSync('./certs/private_unencrypted.pem');
var publicKey = fs.readFileSync('./certs/public.pem');


app.post("/login", function(req, res) {
	if (req.body.user === "pepe" && req.body.password === "pepe") {
		var options = {
			algorithm: 'RS256',
			issuer :  'example.com'
		}
		var token = jwt.sign(req.body, privateKey, options);
		res.send({token : token});
	} else {
		res.send({error : "Invalid user or password"});
	}
});

app.post("/me", function(req, res){
	jwt.verify(req.body.token, publicKey, { algorithms: ['RS256'] }, function(err, decoded) {
	  console.log(decoded);
	  res.send([err,decoded]);
	});
});

// Basic info about this service
app.all("*", function(req, res) {
	res.status(404).send({ error : "Endpoint not found"});
});

// Starting the app on port 5000
app.listen(5000, function() {
	console.log({
		name: pkg.name,
		version: pkg.version,
		description: pkg.description,
		repository: pkg.repository.url
	});
});
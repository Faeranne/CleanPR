var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var module = require('./module.js');

app.use(bodyParser())

app.post('/hook', function(req,res){
	module.hook
});


app.listen(process.env.PORT);

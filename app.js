var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var requests = require('./request.js');

app.use(bodyParser())

app.post('/hook', function(req,res){
	var commits = req.body.commits
	// TODO: Only acknowledge pushes to the "Master" branch.
	res.send(200,'{"message":"ok","result":"ok"}');
	var pulls_url = req.body.repository.pulls_url.split('{/number}')[0]
	console.log(pulls_url);
	requests.parsePulls(pulls_url,function(pull){
		if(pull.mergable==false){
			requests.rebaseComment(pull._links.issue.href);
		}
	});
});


app.listen(process.env.PORT);

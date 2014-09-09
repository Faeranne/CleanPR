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
	requests.parsePulls(pulls_url,function(pull){
		if(pull.mergeable==false){
			requests.rebaseComment(pull._links.comments.href);
		}
	});
});


app.listen(process.env.PORT);

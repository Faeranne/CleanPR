var request = require('request');

var token = "token "+process.env.OATH_TOKEN;

var hook = function(req,res, key){
	var localToken = ""
	if(key){
		localToken = "token "+key
	}else{
		localToken = token
	}
	// TODO: Only acknowledge pushes to the "Master" branch.
	res.send(200,'{"message":"ok","result":"ok"}');
	if(req.body.ref!="refs/heads/master"){
		return
	}
	var pulls_url = req.body.repository.pulls_url.split('{/number}')[0]
	parsePulls(pulls_url,localToken,function(pull){
		if(pull.mergeable==false){
			rebaseComment(pull._links.comments.href, localToken);
		}
	});
}

/**
 * Fetch each pull request for the repository
 *
 * @param {String} url
 * @param {function} cb
 */

var parsePulls = function(url,localToken,cb){
	request({url:url, headers: {'User-Agent': 'github-cleanpr'}}, function(err,res,body){
		var pulls = JSON.parse(body);
		pulls.forEach(function(pull,index){
			request({url:url+"/"+pull.number, headers: {'User-Agent': 'github-cleanpr', "Authorization": localToken}},function(err,res,body){
				cb(JSON.parse(body));
			}) })
	})
}

/**
 * Create GitHub issues for every object in an array of issues
 *
 * @param {String} url
 * @param {String} blob_url
 * @param {Array} issues
 */

var rebaseComment = function(url,localToken){
	var body = {body:"Pull Request needs to be brought up to date"}
	request({url:url, method: 'POST', headers:{"User-Agent":"github-cleanpr", "Authorization": localToken}, body:JSON.stringify(body)}, function(err,res,body){
	});
};

exports.hook = hook

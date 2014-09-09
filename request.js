var request = require('request');

var token = "token "+process.env.OATH_TOKEN;

/**
 * Fetch each pull request for the repository
 *
 * @param {String} url
 * @param {function} cb
 */

var parsePulls = function(url,cb){
	request({url:url, headers: {'User-Agent': 'github-cleanpr'}}, function(err,res,body){
		console.log(err);
		var pulls = JSON.parse(body);
		pulls.forEach(function(pull,index){
			request({url:url+"/"+pull.number, headers: {'User-Agent': 'github-cleanpr'}},function(err,res,body){
				console.log(JSON.parse(body));
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

var rebaseComment = function(url){
	console.log(url);
	var body = {body:"Pull Request needs to be brought up to date"}
	request({url:url, method: 'POST', headers:{"User-Agent":"github-cleanpr", "Authorization": token}, body:JSON.stringify(body)}, function(err,res,body){
		console.log(err)
		console.log(res)
		console.log(body)
	});
};

exports.parsePulls = parsePulls
exports.rebaseComment = rebaseComment



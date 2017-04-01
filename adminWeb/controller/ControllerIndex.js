
var db = require('../model/model');

exports.index = function(request, response){
	request.session.user={id:1};
	if(request.session.user){
		response.render('index',{id:request.session.user.id});
	}else{
		response.render('index',{id:1});
	}
	
};

exports.login = function(request, response){
	if(request.session.user){
		response.render('index',{id:request.session.user.id});
	}else{
		response.render('login');
	}
	
};


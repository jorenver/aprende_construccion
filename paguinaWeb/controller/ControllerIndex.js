
var db = require('../model/model');

exports.index = function(request, response){
	if(request.session.user){
		response.render('index',{id:request.session.user.id});
	}else{
		response.render('index',{id:-1});
	}
	
};

exports.login = function(request, response){
	response.render('login');
};

exports.signup = function(request, response){
	response.render('signup');
};

exports.logout = function(request, response){
	request.session.user=null;
	response.render('index',{id:-1});
};
exports.curso = function(request, response){
	db.curso(request,response)
};

exports.signInUser = function(request, response){
	db.signIn(request, response);
};

exports.crearUsuario = function(request,response){
	db.signUp(request,response);
};



var db = require('../model/model');

exports.index = function(request, response){
	if(request.session.user){
		response.render('index',{id:request.session.user.id});
	}else{
		response.render('index');
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
	response.render('index');
};
exports.curso = function(request, response){
	db.curso(request,response)
};

exports.signInUser = function(req,res){
	db.signIn(req,res);
};

exports.crearUsuario = function(request,response){
	db.signUp(request,response);
};


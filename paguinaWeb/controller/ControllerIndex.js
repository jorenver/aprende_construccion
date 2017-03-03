
var db = require('../model/model');


exports.index = function(request, response){
	//request.session.infoUser=null;
	response.render('index');
};

exports.login = function(request, response){
	response.render('login');
};

exports.signup = function(request, response){
	response.render('signup');
};


exports.curso = function(request, response){
	response.render('index',{id:1});
};

exports.signInUsuer = function(request,response){
	db.signIn(request,response);

};

exports.crearUsuario = function(request,response){
	db.signUp(request,response);
};
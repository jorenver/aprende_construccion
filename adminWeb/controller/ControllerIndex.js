
var db = require('../model/model');

exports.index = function(request, response){
	if(request.session.user){
		response.render('index',{id:request.session.user.id});
	}else{
		response.render('index',{id:-1});
	}
	
};

exports.login = function(request, response){
	if(request.session.user){
		response.render('index',{id:request.session.user.id});
	}else{
		response.render('login');
	}
	
};


exports.logout = function(request, response){
	request.session.user=null;
	response.render('index',{id:-1});
};


exports.loginAdmin = function(request,response){
	db.signInAdmin(request,response);
};

exports.getListEstudiantes = function(request,response){
	response.render('admin');	
};


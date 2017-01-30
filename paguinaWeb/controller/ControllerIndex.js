
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
var db = require('../model/model');

exports.modulo = function(request, response){
	console.log('modulo');
	idModulo= request.query.idModulo;
	console.log(idModulo);

	if(request.session.user){
		db.modulo(request,response);
		
	}else{
		response.render('index');
	}
};

exports.getModulos = function(request, response){
	db.getModulos(request,response)
};

exports.getCapitulos = function(request, response){
	db.getCapitulos(request,response)
};
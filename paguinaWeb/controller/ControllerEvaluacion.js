var db = require('../model/model');

exports.evaluaciones = function(request, response){
	console.log('get Evaluaciones');
	if(request.session.user){
		response.render('evaluaciones',{id:request.session.user.id});
	}else{
		response.render('index',{id:-1});
	}
};

exports.getEvaluacionByIdCapitulo = function(request, response){
	console.log('get Evaluacion Capitulo');
	db.getEvaluacionByIdCapitulo(request, response);
};
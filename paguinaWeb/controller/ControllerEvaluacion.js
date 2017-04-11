var db = require('../model/model');

exports.evaluaciones = function(request, response){
	db.evaluaciones(request,response);
};


exports.evaluacionCapitulo = function(request, response){
	db.evaluacionCapitulo(request, response);
};

exports.evaluacionModulo = function(request, response){
	db.evaluacionModulo(request, response);
};
exports.calificar = function(request, response){
	db.calificar(request, response);
};

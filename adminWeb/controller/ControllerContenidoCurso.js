var db = require('../model/model');

exports.modulos = function(request,response){
	db.modulos(request,response);
};
exports.agregarModulo = function(request,response){
	db.agregarModulo(request,response);
};
exports.eliminarModulo = function(request,response){
	db.eliminarModulo(request,response);
};



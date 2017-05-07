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

exports.getModulo = function(request,response){
    db.getModulo(request,response);
};

exports.actualizarModulo = function(request,response){
    db.actualizarModulo(request,response);
};

exports.capitulos = function(request,response){
	db.capitulos(request,response);
};

exports.secciones = function(request,response){
    db.secciones(request,response);
};

exports.parrafos = function(request,response){
    db.parrafos(request,response);
};


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

exports.agregarCapitulo = function(request,response){
    db.agregarCapitulo(request,response);
};

exports.eliminarCapitulo = function(request,response){
    db.eliminarCapitulo(request,response);
};

exports.actualizarCapitulo = function(request,response){
    db.actualizarCapitulo(request,response);
};

exports.getCapitulo = function(request,response){
    db.getCapitulo(request,response);
};

exports.secciones = function(request,response){
    db.secciones(request,response);
};

exports.agregarSeccion = function(request,response){
    db.agregarSeccion(request,response);
};

exports.eliminarSeccion = function(request,response){
    db.eliminarSeccion(request,response);
};

exports.getSeccion = function(request,response){
    db.getSeccion(request,response);
};

exports.actualizarSeccion = function(request,response){
    db.actualizarSeccion(request,response);
};

exports.parrafos = function(request,response){
    db.parrafos(request,response);
};

exports.agregarParrafo = function(request,response){
    db.agregarParrafo(request,response);
};

exports.eliminarParrafo = function(request,response){
    db.eliminarParrafo(request,response);
};

exports.getParrafo = function(request,response){
    db.getParrafo(request,response);
};

exports.actualizarParrafo = function(request,response){
    db.actualizarParrafo(request,response);
};


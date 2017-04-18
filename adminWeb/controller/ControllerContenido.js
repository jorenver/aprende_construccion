var db = require('../model/model');


exports.loadContenido = function(request,response){
    db.contenido(request,response);
}

exports.getExamenByCapitulo = function(request,reponse){
    db.getExamenesByCapitulo(request,reponse);
}

exports.verPreguntaById = function(request,response){
    db.verPregunta(request,response);
}

exports.editarPreguntaById = function(request,response){
    db.actualizarPregunta(request,response);

}

exports.eliminarPreguntaById = function(request,response){
    db.eliminarPregunta(request,response);

}
exports.guardarPregunta = function(request,response){
    db.guardarPregunta(request,response);

}
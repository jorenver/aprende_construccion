var db = require('../model/model');


exports.loadContenido = function(request,response){
    db.contenido(request,response);
}

exports.getExamenByCapitulo = function(request,reponse){
    db.getExamenesByCapitulo(request,reponse);
}
var db = require('../model/model');

var multer = require('multer');

var Storage = multer.diskStorage({
    destination: function(request,file,callback){
        callback(null,"./../paguinaWeb/static/images");
    },
    filename: function(request,file,callback){
        callback(null, file.originalname);
    }
});

var upload = multer({storage:Storage}).array("imgUploader",3);


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

exports.uploadPicture = function(request,response){
    upload(request,response,function(err){
        if(err){
            console.log("error algo paso");
            response.json({ruta:"null"});
        }
        else{
            console.log("archivo subido exitosamente");
            response.json({ruta:request.files[0].originalname});

        }
    });
}
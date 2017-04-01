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

exports.getListEstudiantes = function(request,response) {
	db.listaEstudiantes(request,response);
}

exports.getListCalificaciones = function (request,response) {
	db.getCalifacionEstudiante(request,response);
}
exports.getContenidoCapitulo = function(request, response){
	console.log('contenido capitulo');
	console.log(request.query);
	idcapitulo= request.query.idcapitulo;
	console.log(idcapitulo);
	if(request.session.user){
		var respuesta={error:false,
						titulo:"XYZ",
						indice:1,
						secciones:[
									{	titulo:"Titulo 1",
										indice:1,
										contenidos:[
													{	texto:"Este es el parrafo numero 1 de la seccion 1",
														multimedia: null
													},
													{	texto:"Este es el parrafo numero 2 de la seccion 1, tiene una foto",
														multimedia: {tipo:"foto",ruta:"images/plano.gif"}

													}]
									},
									{	titulo:"Titulo 2",
										indice:2,
										contenidos:[
													{	texto:"Este es el parrafo numero 1 de la seccion 2",
														multimedia: null
													},
													{	texto:"Este es el parrafo numero 2 de la seccion 2, tiene una video",
														multimedia: {tipo:"video",ruta:"https://www.youtube.com/embed/mzq656xAUy4"}

													}]
									}]
		};
		console.log(respuesta);
		response.json(respuesta);
		
	}else{
		response.json({error:true});
	}
};

var db = require('../model/model');

exports.evaluaciones = function(request, response){
	console.log('get Evaluaciones');
	if(request.session.user){
		var respuesta={ id:request.session.user.id,
						modulos:[{titulo:"Lectura de Planos",
								 indice:1,
								 capitulos:[{titulo:"Planos Arquitectonicos",indice:1,nota:90},
								 			{titulo:"Planos Geotecnicos",indice:1,nota:70},
								 			{titulo:"Planos Viales",indice:1,nota:null}]
								 },
								 {titulo:"Lectura de Planos",
								 indice:2,
								 capitulos:[{titulo:"Planos Arquitectonicos",indice:1,nota:40},
								 			{titulo:"Planos Geotecnicos",indice:1,nota:70},
								 			{titulo:"Planos Viales",indice:1,nota:null}]
								 }]
					};
		console.log(respuesta);
		response.render('evaluaciones',respuesta);
	}else{
		response.render('index',{id:-1});
	}
};

exports.getEvaluacionByIdCapitulo = function(request, response){
	console.log('get Evaluacion Capitulo');
	db.getEvaluacionByIdCapitulo(request, response);
};
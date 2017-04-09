var mysql = require("mysql");

var connection = mysql.createPool({
	connectionLimit : 10,
    host : "80.241.222.40",
    user : "kevin",
    port : "3306",
    password : "*yIO8v3hVai0zosaD",
    database : "Sistema_Aprendizaje_Construccion"
});
/*
connection.connect(
    function(err){if(err) throw err;}
);
*/


exports.curso = function(request, response){
	if(request.session.user){
		console.log("id usuario: "+request.session.user.id);
		response.render('index',{id:request.session.user.id});
	}else{
		response.render('index',{id:-1});
	}
};

exports.getModulos = function(request, response){
	console.log('*****Modulos******')
	if(request.session.user){
		connection.query('call getModulos()',function(err,rows){
		  if(err){
		  	console.log(err);
		  	response.json({error:true});
		  } 
		  else if(rows[0]){
		  	//console.log(rows[0])
		  	response.json({error:false,modulos:rows[0]});
		  }else{
		  	response.json({error:true});
		  }
		});
	}else{
		response.json({error:true});
	}
	
};

exports.modulo = function(request, response){
	idModulo=request.query.idModulo;
	console.log('Capitulos del Modulo:' +idModulo)
	query= 'call getModulo('+idModulo+')';
	query2= 'call getCapitulosByModuloId('+idModulo+')';
	if(request.session.user){
		connection.query(query,function(err,rows){
		  if(err){ 
		  	console.log(err);
		  	response.json({error:true});
		  }
		  else if(rows[0][0]){
		  	infoModulo= rows[0][0];
		  	connection.query(query2,function(err,rows){
			  if(err){ 
			  	console.log(err);
			  	response.json({error:true})
			  }
			  if(rows[0]){
			  	response.render('modulo',{id:request.session.user.id,modulo:infoModulo,capitulos:rows[0]});
			  }else{
			  	response.render('index',{id:-1});
			  }
			});

		  }else{
		  	response.render('index',{id:-1});
		  }
		});
	}else{
		response.json({error:true})
	}
	
};


exports.signIn = function(request,response){
    var cedula = request.body.cedula;
    var password = request.body.password;
    console.log(cedula);
    connection.query('call signIn("'+cedula+'","'+password+'")',function(err,rows){
        if(err){
        	console.log(err);
        	response.json({truly_signIn:false,estado:"Usuario_incorrecto"});
        } 
        else if (rows[0][0] != undefined) {
        	request.session.user= rows[0][0];
  			console.log("Sesion iniciada: "+request.session.user.id);
            response.json({truly_signIn:true});
        }
        else {
            response.json({truly_signIn:false,estado:"Usuario_incorrecto"});

        }
    });
}

exports.signUp = function(request,response){
    var cedula = request.body.cedula;
    var nombre = request.body.nombre;
    var apellido = request.body.apellido;
    var email = request.body.correo;
    var password = request.body.password;
    var telefono = request.body.telefono;
    var direccion = request.body.direccion;
    var ciudad = request.body.ciudad;
    var provincia = request.body.provincia;
    var distrito = request.body.distrito;
    connection.query('call crearUsuario("'+cedula+'","'+nombre+'","'+apellido+'","'+telefono+'","'+direccion+'","'+ciudad+'","'+provincia+'","'+distrito+'","'+password+'","'+email+'")',function(err,rows){
        if(err){
        	console.log(err);
			response.json({estado:"No_Guardado"});
		}
			response.json({estado:"Guardado"});
    });
};




exports.getContenidoCapitulo = function(request,response){
    idcapitulo= request.query.idcapitulo;
	console.log('@@@@@@@Contenido Cspitulo: '+idcapitulo);
	if(request.session.user){
		connection.query('CALL getSeccionesByCapituloId('+idcapitulo+')',function(err,result1){
	        if(err){
	        	console.log(error);
	        	response.json({error:true});
	        }else{
			    connection.query('CALL getContenidoCapitulonByCapituloId('+idcapitulo+')',function(err,result2){
			        if(err){
			        	console.log(error);
			        	response.json({error:true});
			        }else{
			        	var respuesta={error:false,
			        					idCapitulo:idcapitulo,
			        					secciones:[]
			        	}
			        	seccionesCapitulo=result1[0];
			        	contenidoCapitulo=result2[0];
			        	var ultimo=0;
			        	for (var i = 0; i < seccionesCapitulo.length; i++) {
			        		var infoSeccion=seccionesCapitulo[i];
			        		var ban=true;
			        		var seccion={titulo:infoSeccion.titulo,
			        					indice:infoSeccion.indice,
			        					contenidos:[]}
			        		for (var j = ultimo; j < contenidoCapitulo.length; j++) {
			        			if(ban || infoSeccion.id==contenidoCapitulo[j].id){
			        				if(infoSeccion.id==contenidoCapitulo[j].id){
			        					ban=false;
			        					//console.log(infoSeccion.id);
			        					var contenido={texto:contenidoCapitulo[j].texto,
			        									multimedia:null}
			        					if(contenidoCapitulo[j].ruta_multimedia){
			        						var multimedia={
			        							tipo:contenidoCapitulo[j].tipo_multimedia,
			        							ruta:contenidoCapitulo[j].ruta_multimedia,
			        							descripcion:contenidoCapitulo[j].descripcion_multimedia,
			        							fuente:contenidoCapitulo[j].fuente_multimedia}
			        							contenido.multimedia=multimedia;
			        					}
			        					seccion.contenidos.push(contenido);
			        				}
			        			}else{
			        				ultimo=j;
			        				break;
			        			}
			        		};
			        		respuesta.secciones.push(seccion);
			        	};
			        	response.json(respuesta);
			        }

			    });
			}
		});
	}else{
		response.json({error:true});
	}
}

exports.evaluacionCapitulo = function(request, response){
	var idCapitulo=request.query.idCapitulo;
	console.log('Evaluacion Capitulo: '+idCapitulo);
	if(request.session.user){
		connection.query('call getPreguntasCapitulo('+idCapitulo+')',function(err,rows){
	        if(err){
	        	console.log(err);
				response.render('index',{id:-1});
			}
			var respuesta={id:request.session.user.id,
							titulo:"Planos Arquitectonicos",
							preguntas:[]};
			var preguntas=rows[0];
			for (var i = 0; i < preguntas.length; i++) {
				var pregunta={	id:preguntas[i].id,
								pregunta:preguntas[i].pregunta,
								opcion_1:preguntas[i].opcion_1,
								opcion_2:preguntas[i].opcion_2,
								opcion_3:preguntas[i].opcion_3,
								opcion_4:preguntas[i].opcion_4,
								multimedia:{
									tipo_multimedia:preguntas[i].tipo_multimedia,
									ruta_multimedia:preguntas[i].ruta_multimedia
								}
								
							}
				respuesta.preguntas.push(pregunta);
			};
			response.render('evaluacion',respuesta);
	    });
	}else{
		response.render('index',{id:-1});
	}
}

exports.evaluacionModulo = function(request, response){
	var idModulo=request.query.idModulo;
	console.log('Evaluacion Modulo: '+idModulo);
	if(request.session.user){
		connection.query('call getPreguntasCapitulo('+idModulo+')',function(err,rows){
	        if(err){
	        	console.log(err);
				response.render('index',{id:-1});
			}
			var respuesta={id:request.session.user.id,
							titulo:"Planos Arquitectonicos",
							preguntas:[]};
			var preguntas=rows[0];
			for (var i = 0; i < preguntas.length; i++) {
				var pregunta={	id:preguntas[i].id,
								pregunta:preguntas[i].pregunta,
								opcion_1:preguntas[i].opcion_1,
								opcion_2:preguntas[i].opcion_2,
								opcion_3:preguntas[i].opcion_3,
								opcion_4:preguntas[i].opcion_4,
								multimedia:{
									tipo_multimedia:preguntas[i].tipo_multimedia,
									ruta_multimedia:preguntas[i].ruta_multimedia
								}
								
							}
				respuesta.preguntas.push(pregunta);
			};
			response.render('evaluacion',respuesta);
	    });
	}else{
		response.render('index',{id:-1});
	}
}

exports.evaluaciones = function(request,response){
    console.log('get Evaluaciones');
	if(request.session.user){
		/*
		Ejemplo de objeto que se envia al cliente
		var respuesta={ id:request.session.user.id,
						modulos:[{id:1,
								 titulo:"Lectura de Planos",
								 indice:1,
								 nota:95,
								 capitulos:[{id:1,titulo:"Planos Arquitectonicos",indice:1,nota:90},
								 			{id:2,titulo:"Planos Geotecnicos",indice:1,nota:70},
								 			{id:3,titulo:"Planos Viales",indice:1,nota:null}]
								 },
								 {id:2,
								 titulo:"Lectura de Planos",
								 indice:2,
								 nota:null,
								 capitulos:[{id:4,titulo:"Planos Arquitectonicos",indice:1,nota:40},
								 			{id:5,titulo:"Planos Geotecnicos",indice:1,nota:70},
								 			{id:6,titulo:"Planos Viales",indice:1,nota:null}]
								 }]
					};
		*/
		var userId=request.session.user.id;
		console.log(userId);
		connection.query('call getCalificacionModuloByEstudianteId('+userId+')',function(err,rows1){
	        if(err){
	        	console.log(err);
				response.render('index',{id:-1});
			}
			connection.query('call getCalificacionCapitulosByEstudianteId('+userId+')',function(err,rows2){
		        if(err){
		        	console.log(err);
					response.render('index',{id:-1});
				}
				var calificacionesModulos=rows1[0];
				var calificacionesCapitulo=rows2[0];
				var respuesta={ id:request.session.user.id,
							modulos:[]
						};
				var ultimo=0;
				for (var i = 0; i < calificacionesModulos.length; i++) {
					var modulo={id:calificacionesModulos[i].id,
								titulo:calificacionesModulos[i].titulo,
								indice:calificacionesModulos[i].indice_Modulo,
								nota:calificacionesModulos[i].calificacion,
								capitulos:[]};
					var ban=true;
					for (var j = ultimo; j < calificacionesCapitulo.length; j++) {
	        			if(ban || modulo.id==calificacionesCapitulo[j].id){
	        				if(modulo.id==calificacionesCapitulo[j].id){
	        					ban=false;
	        					var capitulo={	id:calificacionesCapitulo[j].id_capitulo,
	        									titulo:calificacionesCapitulo[j].titulo_capitulo,
	        									indice:calificacionesCapitulo[j].indice_capitulo,
	        									nota:calificacionesCapitulo[j].calificacion};
	        					modulo.capitulos.push(capitulo);
	        				}
	        			}else{
	        				ultimo=j;
	        				break;
	        			}
	        		};
					respuesta.modulos.push(modulo);
				}
				response.render('evaluaciones',respuesta);
				
		    });
	    });
		
	}else{
		response.render('index',{id:-1});
	}
}











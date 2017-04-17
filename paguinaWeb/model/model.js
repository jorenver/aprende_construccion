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
		response.render('index',{id:request.session.user.id});
	}else{
		response.render('index',{id:-1});
	}
};

exports.getModulos = function(request, response){
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
	if(request.session.user){
		connection.query('call getInfoCapituloById('+idCapitulo+')',function(err,rows){
			if(err){
		        console.log(err);
				response.render('index',{id:request.session.user.id});
			}else{
				var infoCapitulo=rows[0][0];
				if(infoCapitulo){
					connection.query('call getPreguntasCapitulo('+idCapitulo+')',function(err,rows2){
				        if(err){
				        	console.log(err);
							response.render('index',{id:request.session.user.id});
						}else{
							var respuesta={	id:request.session.user.id,
											tipo:0,
											id_capitulo:infoCapitulo.id,
											titulo:infoCapitulo.titulo,
											indice:infoCapitulo.indice,
											preguntas:[]};
							var preguntas=rows2[0];
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
						}
				    });
				}else{
					response.render('index',{id:request.session.user.id});
				}
			}
		});
	}else{
		response.render('index',{id:-1});
	}
}

exports.evaluacionModulo = function(request, response){
	var idModulo=request.query.idModulo;
	if(request.session.user){
		connection.query('call getInfoModuloById('+idModulo+')',function(err,rows){
			if(err){
		        	console.log(err);
					response.render('index',{id:request.session.user.id});
			}else{
				var infoModulo=rows[0][0];
				if(infoModulo){
					connection.query('call getPreguntasModulo('+idModulo+')',function(err,rows2){
				        if(err){
				        	console.log(err);
							response.render('index',{id:request.session.user.id});
						}else{
							var respuesta={	id:request.session.user.id,
											tipo:1,
											id_modulo:infoModulo.id,
											titulo:infoModulo.titulo,
											indice:infoModulo.indice,
											preguntas:[]};
							var preguntas=rows2[0];
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
						}
				    });
				}else{
					response.render('index',{id:request.session.user.id});
				}
			}
		});
	}else{
		response.render('index',{id:-1});
	}
}

exports.evaluaciones = function(request,response){
	if(request.session.user){
		var userId=request.session.user.id;
		console.log(userId);
		connection.query('call getCalificacionModuloByEstudianteId('+userId+')',function(err,rows1){
	        if(err){
	        	console.log(err);
				response.render('index',{id:-1});
			}else{
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
			}
	    });
		
	}else{
		response.render('index',{id:-1});
	}
}

exports.calificar = function(request, response){
	if(request.session.user){
		var idEstudiante=request.session.user.id;
		var tipo=request.body.tipo;
		var id_evaluacion=request.body.id_evaluacion;
		var respuestas=request.body.respuestas;
		var query="";
		if(tipo=="capitulo"){
			query='call getPreguntasCapitulo('+id_evaluacion+')';
		}else{
			query='call getPreguntasModulo('+id_evaluacion+')';
		}
		connection.query(query,function(err,rows){
	        if(err){
	        	console.log(err);
				response.json({error:true});
			}else{
				preguntas=rows[0];
				var total=preguntas.length;
				var correctas=0;
				var ultimo=0;
				for (var i = 0; i < total; i++) {
					pregunta=preguntas[i];
					for (var j = ultimo; j< respuestas.length; j++) {
						respuesta=respuestas[j];
						if(pregunta.id==respuesta.id_pregunta){
							if(pregunta.correcta==respuesta.opcion_seleccionada)
								correctas=correctas+1;
							ultimo=j;
							break;
						}
					};
				};
				var calificacion=100.0*correctas/total;
				if(tipo=="capitulo"){
					query2='call guardarCalificacionCapituloEstudiante('+id_evaluacion+','+idEstudiante+','+calificacion.toFixed(2)+')';
				}else{
					query2='call guardarCalificacionModuloEstudiante('+id_evaluacion+','+idEstudiante+','+calificacion.toFixed(2)+')';
				}
				console.log(query2);
				connection.query(query2,function(err,rows){
			        if(err){
			        	console.log(err);
						response.json({error:true});
					}else{
						response.json({error:false,calificacion:calificacion});
					}
				});	
			}
		});
	}else{
		response.json({error:true});
	}

	
}












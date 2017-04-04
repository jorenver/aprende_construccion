var mysql = require("mysql");

var connection = mysql.createConnection({
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
connection.connect(function(err){
	if(err) throw err;
	console.log("conectado exitosamente");
});

exports.curso = function(request, response){
	var cedula="0951060185"
	connection.query('call getUserInfoByCedula("'+cedula+'")',function(err,rows){
	  if(err) throw err;
	  if(rows[0][0]){
	  	request.session.user= rows[0][0];
	  	console.log(request.session.user.id);
	  	response.render('index',{id:request.session.user.id});
	  }else{
	  	response.render('index');
	  }
	});
	

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

exports.listaEstudiantes =function(request,response) {
	    var estudiantes = [];
		var lstEstudiantes = [];
		connection.query('call cargarListadoUsuarios',function(err,rows) {
		try {
			estudiantes = rows[0];
			for (var node in estudiantes){
				var estudiante = {
					id: node.id,
					cedula: node.cedula,
					nombre: node.nombre,
					apellido: node.apellido
				}
				lstEstudiantes.push(estudiante);
			}
			response.render('listEstudiantes',lstEstudiantes);
		}
		 catch (err) {
			console.log(err);
			response.render('listEstudiantes',lstEstudiantes);
		}
	});
}

exports.getCalifacionEstudiante = function (request,response) {
	 var calificaciones= []
	 var objetoEstudiante = {
		     listaModulos:[],
			 listaCapitulos:[],
			 listaCalificaciones:[]
	 }
	connection.query('call  getInformationCalificacionUser("'+request.id+'")',function (err,rows) {
		try {
			calificaciones = rows[0]
			for(var calificacion in calificaciones){
				objetoEstudiante.listaCalificaciones.push(calificacion.Calificacion);
				objetoEstudiante.listaCapitulos.push(calificacion.Capitulo);
				objetoEstudiante.listaModulos.push(calificacion.Modulo);
			}
		} catch (err) {
			console.log(err);			
		}
	});
	return objetoEstudiante;
}


exports.getInformationStudent=function(request,response){
	 var objetoCalificacion = {
		 cedula:"",
		 correo:"",
		 apellido: "",
		 nombre: ""	 
	 }
	connection.query('call getEstudianteId("'+request.id+'")',function(err,rows){
		try {
			var estudiante = rows[0];
			objetoCalificacion.cedula = estudiante.cedula;
			objetoCalificacion.nombre = estudiante.nombre;
			objetoCalificacion.apellido = estudiante.apellido;
			objetoCalificacion.correo = estudiante.correo;
			
		} catch (err) {
			console.log(err);
		}
	});
	return objetoCalificacion;

}

exports.getModulosStudent=function (request,response) {
	var lstNameModulos = [];
	var lstModulos = [];
	connection.query('call loadModulosEstudiante',function (err,rows) {
		try {
		    lstModulos = rows[0]
			for(var modulo in lstModulos){
				lstNameModulos.push(modulo.titulo);
			}	
		} catch (err) {
			console.log(err);
		}
	});
	return lstNameModulos;

	
}


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

exports.getEvaluacionByIdCapitulo = function(request, response){
	if(request.session.user){
		connection.query('call getPreguntasCapitulo(1)',function(err,rows){
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











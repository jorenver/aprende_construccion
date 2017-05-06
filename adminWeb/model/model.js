var mysql = require("mysql");

var connection = mysql.createPool({
	connectionLimit : 10,
    host : "80.241.222.40",
    user : "kevin",
    port : "3306",
    password : "*yIO8v3hVai0zosaD",
    database : "Sistema_Aprendizaje_Construccion"
});





exports.signInAdmin = function(request,response){
    var cedula = request.body.ced;
    var password = request.body.pass;
    connection.query('call signInAdmin("'+cedula+'","'+password+'")',function(err,rows){
        if (rows[0][0] != undefined) {
        	request.session.user= rows[0][0];
			request.session.user.id = 1;
  			console.log("Sesion iniciada: "+request.session.user.id);
            response.json({success:true});
        }
        else {
            response.json({success:false});

        }
    });
}

/**
 * Esta funcion lo que hace es llamar la lista de estudiantes en la base de datos
 * se envia un json con un arreglo de estudiantes 
 */

exports.listaEstudiantes =function(request,response) {
	var lstEstudiantes = [];
	if(request.session.user){
		connection.query('call cargarListadoUsuarios',function(err,rows) {
			try {
				for (var i=0; i < rows[0].length;i++){
					var estudiante = {
						id: rows[0][i].id,
						cedula: rows[0][i].cedula,
						nombre: rows[0][i].nombre,
						apellido: rows[0][i].apellido
					}
					lstEstudiantes.push(estudiante);
				}
				response.render('listaEstudiantes',{lstEstudiantes:lstEstudiantes});
			}
	 		catch (err) {
				console.log(err);
	 		}
		});
 	}
 	else{
	 	response.render('login')
 	}
		
}

exports.calificaciones = function(request,response){
	if(request.session.user){
					var userId=request.query.id;
					var estudiante={ nombre:"",
									apellido:"",
									cedula:"",
									correo:"",
									modulos:[]
									};
					connection.query('call getEstudianteId('+userId+')',function(err,rows){
						estudiante.nombre = rows[0][0].nombre;
						estudiante.apellido = rows[0][0].apellido;
						estudiante.cedula = rows[0][0].cedula;
						estudiante.correo = rows[0][0].correo;
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
								estudiante.modulos.push(modulo);
							}
							console.log(estudiante)
							response.render('avanceEstudiante',{estudiante:estudiante});
							
						});
					});

				});
					
	}
	else{
		response.render('login');
	}
		
}


exports.modulos =function(request,response) {
	if(request.session.user){
		/*var respuesta={
			modulos:[{id:1,indice:1,titulo:"Modulo 1"},{id:2,indice:2,titulo:"Modulo 2"},{id:3,indice:3,titulo:"Modulo 3"}]
		}*/
		connection.query('call getModulos()',function(err,rows){
			if(err){
				console.log(err);
				response.render('login');
			}
			if(rows[0]){
				var respuesta={modulos:rows[0]};
				response.render('adminModulos',respuesta);
			}
			else{
				response.render('login');
			}
		});
		
	}
	else{
		response.render('login');
	}
}


exports.contenido = function(request,response){
	if(request.session.user){
			var lstContenido = []
		connection.query('call getModulos',function(err,rows){
			if(err){
				console.log(err);
				response.render('index');
			}

			connection.query('call getCapitulos',function(err,rows1){
					var listadoModulos = rows[0];
					var listaCapitulos = rows1[0];
					for(var i=0; i < listadoModulos.length ; i++){
						   var modulo ={
							   idModulo:listadoModulos[i].id,
							   tituloModulo:listadoModulos[i].titulo,
							   capitulos:[]
						   }
							for(var j=0; j< listaCapitulos.length; j++){
								var idModulo = modulo.idModulo;
								var idCapitulo = listaCapitulos[j].modulo; 
								if( idModulo == idCapitulo ){
									var capitulo = {
										idCapitulo:listaCapitulos[j].id,
										tituloCapitulo:listaCapitulos[j].titulo
									}
									modulo.capitulos.push(capitulo);
								}
								console.log("probo");
							}
							lstContenido.push(modulo);
							console.log(lstContenido);
						}
					response.render('Contenido',{lstContenido:lstContenido});
					});
		});
		

	}
	else{
		response.render('login');

	}
}

exports.getExamenesByCapitulo = function(request,response){
	if(request.session.user){
		var id = request.query.id;
		connection.query('call getPreguntasCapitulo('+id+')',function(err,rows){
			if(err){
				response.render('index');
				console.log(err);
			}
			connection.query('call getInfoCapituloById('+id+')',function(err,rows1){
						var listadoPregunta = {
						        idModulo:rows1[0][0].modulo,
								idCapitulo:rows1[0][0].id,
								tituloCapitulo:rows1[0][0].titulo,
								preguntas:[]
						}
						for( var i = 0 ; i < rows[0].length;i++){
									var preguntas ={
										id:rows[0][i].id,
										pregunta:rows[0][i].pregunta,
										tipoMultimedia:rows[0][i].tipo_multimedia,
										rutaMultimedia: rows[0][i].ruta_multimedia,
										opcion1:rows[0][i].opcion_1,
										opcion2:rows[0][i].opcion_2,
										opcion3:rows[0][i].opcion_3,
										opcion4:rows[0][i].opcion_4,
										correcta:rows[0][i].correcta
									}
							listadoPregunta.preguntas.push(preguntas);
						}


				response.render('evaluaciones',{listadoPregunta:listadoPregunta});
				console.log(listadoPregunta);	


			});
		});
	}
	else{
		response.render('login');
	}
}


exports.verPregunta = function(request,response){
	if(request.session.user){
		var id = request.query.id;
		connection.query('call verPregunta('+id+')',function(err,rows){
			var pregunta = {
                id:0,
                pregunta:"",
                tipoMultimedia:"",
                ruta:"",
                opcion1:"",
                opcion2:"",
                opcion3:"",
                opcion4:"",
                correcta:0,
                capituloPregunta:0,
                moduloPregunta:0
			};
			try {
				var objetoPregunta = rows[0][0];
				pregunta.id = objetoPregunta.id;
				pregunta.pregunta = objetoPregunta.pregunta;
				pregunta.tipoMultimedia = objetoPregunta.tipo_multimedia;
				pregunta.ruta = objetoPregunta.ruta_multimedia;
				pregunta.opcion1 = objetoPregunta.opcion_1;
				pregunta.opcion2 = objetoPregunta.opcion_2;
				pregunta.opcion3 = objetoPregunta.opcion_3;
				pregunta.opcion4 = objetoPregunta.opcion_4;
				pregunta.correcta = objetoPregunta.correcta;
				pregunta.capituloPregunta = objetoPregunta.capitulo;
				pregunta.moduloPregunta = objetoPregunta.modulo;

				response.json({pregunta:pregunta});
			}
			catch (err) {
				console.log(err);
				response.json({pregunta:null});
			}

		});
	}
	else{
		response.render('login');
	}


};

exports.actualizarPregunta = function(request,response){
	if (request.session.user) {
		connection.query('call actualizarPreguntas('+request.body.id+',"'+request.body.pregunta+'","'+request.body.opcion1+'","'+request.body.opcion2+'","'+request.body.opcion3+'","'+request.body.opcion4+'",'+request.body.capituloPregunta+','+request.body.moduloPregunta+',"'+request.body.tipoMultimedia+'","'+request.body.ruta+'","'+request.body.imagen1+'",'+request.body.correcta+')',function(err,rows){
			if(err){
				console.log(err);
			}
			if(rows != undefined){
				response.json({exito:true});
			}
			else{
				response.json({exito:false});
			}
		
		});
	}
	else{
		response.render('login');
	}

}
exports.eliminarPregunta = function(request,response){
	if(request.session.user){
		var id = request.query.id;
		connection.query('call eliminarPregunta('+id+')',function(err,rows){
			try {
			var objetoPregunta = rows;
			 if(objetoPregunta != undefined){
				response.json({exito:true});
			 }
			 else{
				response.json({exito:false});
			 }	
			} catch (err) {
				console.log(err);
			}

		});
	}
	else{
		response.render('login');
	}

}

exports.guardarPregunta= function(request,response){
	var pregunta = request.body.pregunta;
	var opcion1= request.body.opcion1;
	var opcion2= request.body.opcion2;
	var opcion3= request.body.opcion3;
	var opcion4= request.body.opcion4;
	var capituloPregunta = request.body.capituloPregunta;
	var moduloPregunta = request.body.moduloPregunta;
	var tipoMultimedia = request.body.tipoMultimedia;
	var ruta = request.body.ruta;
	var imagen1 = request.body.imagen1;
	var correcta = request.body.correcta;
	if (request.session.user) {
		connection.query('call guardarPreguntas("'+pregunta+'","'+opcion1+'","'+opcion2+'","'+opcion3+'","'+opcion4+'",'+capituloPregunta+','+moduloPregunta+',"'+tipoMultimedia+'","'+ruta+'","'+imagen1+'",'+correcta+')',function(err,rows){
			if(err){
				console.log(err);
			}
			if(rows != undefined){
				response.json({exito:true});
			}
			else{
				response.json({exito:false});
			}
		
		});
	}
	else{
		response.render('login');
	}

}

exports.agregarModulo = function(request,response){
	if(request.session.user){
		var indice= request.body.indice;
		var titulo= request.body.titulo;
		var query = 'call guardarModulo('+indice+',"'+titulo+'")';
		console.log(query);
		connection.query(query,function(err,rows){
			if(err){
				console.log(err);
				response.json({error:true});
			}else{
				response.json({error:false});
			}
		});
	}
	else{
		response.json({error:true});
	}
}

exports.eliminarModulo = function(request,response){
	if(request.session.user){
		var query = 'call deleteModulo('+request.query.id+')';
		console.log(query);
		connection.query(query,function(err,rows){
			if(err){
				console.log(err);
				response.json({error:true});
			}else{
				response.json({error:false});
			}
		});
	}
	else{
		response.json({error:true});
	}
}








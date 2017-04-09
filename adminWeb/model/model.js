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
		request.session.user.id = 1;
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
			response.render('listaEstudiantes',{lstEstudiantes});
		}
		 catch (err) {
			console.log(err);
		}
	});
}

exports.calificaciones = function(request,response){
		var userId=request.query.id;
		var estudiante={ nombre:"",
						 apellido:"",
						 cedula:"",
						 correo:"",
						 modulos:[]
						};
		console.log(userId);
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
				response.render('avanceEstudiante',{estudiante});
				
		    });
	   	 });

	});
		
		
}











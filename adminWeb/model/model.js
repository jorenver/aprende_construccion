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








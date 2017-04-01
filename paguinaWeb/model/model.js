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
		  if(err) throw err;
		  if(rows[0]){
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
		  if(err) throw err;
		  if(rows[0][0]){
		  	infoModulo= rows[0][0];
		  	connection.query(query2,function(err,rows){
			  if(err) throw err;
			  if(rows[0]){
			  	//console.log(rows[0])
			  	response.render('modulo',{id:request.session.user.id,modulo:infoModulo,capitulos:rows[0]});
			  }else{
			  	response.render('index');
			  }
			});

		  }else{
		  	response.render('index');
		  }
		});

		
	}else{
		response.json({error:true})
	}
	
};


exports.signIn = function(req,res){
    var cedula = req.body.cedula;
    var password = req.body.password;
    console.log(cedula);
    connection.query('call signIn("'+cedula+'","'+password+'")',function(err,rows){
            if(err) throw err;
            if (rows[0][0] != undefined) {
                res.json({truly_signIn:true,id:rows[0][0].id,cedula:rows[0][0].cedula,
                         nombre:rows[0][0].nombre,apellido:rows[0][0].apellido,telefono:rows[0][0].telefono,
                         direccion:rows[0][0].direccion,ciudad:rows[0][0].ciudad,provincia:rows[0][0].provincia,
                         distrito:rows[0][0].distrito,correo:rows[0][0].correo});
            }
            else {
                res.json({truly_signIn:false,estado:"Usuario_incorrecto"});

            }
    } );
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
			response.json({estado:"No_Guardado"});
		}
			response.json({estado:"Guardado"});
    });
};

exports.listaEstudiantes =function(request,response) {
		connection.query('call cargarListadoUsuarios',function(err,rows) {
		try {
			response.json({listadoUsuarios:rows});
			
		} catch (err) {
			console.log(err);
			response.json({listadoUsuarios:"null"});
		}
	});
}

exports.getCalifacionEstudiante = function (request,response) {
	connection.query('call  getInformationCalificacionUser("'+request.id+'")',function (err,rows) {
		try {
			response.json({listaCalificaciones:rows});
		} catch (err) {
			console.log(err);
			response.json({listaCalificaciones:"null"});
			
		}
	});
}










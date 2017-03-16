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
exports.curso = function(request, response){
	console.log("curso");
	if(request.session.user){
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

/*
exports.getContenidoCapitulo = function(request,response){
    
    connection.query('call',function(err,rows){
        if(err)
    });
};

*/










var mysql = require("mysql");

var connection = mysql.createConnection({
    host : "80.241.222.40",
    user : "kevin",
    port : "3306",
    password : "*yIO8v3hVai0zosaD",
    database : "Sistema_Aprendizaje_Construccion"
});

/*
connection.connect(function(err){
     if(!err){
        console.log("Base de Datos conectada con exito");
     }
     else {
        console.log("Error en la conexion de la base de datos");
     }
    }
);
*/
exports.curso = function(request, response){
	var cedula="0951060185"
	console.log("curso")
	connection.query('call getUserInfoByCedula("'+cedula+'")',function(err,rows){
	  if(err) throw err;
	  if(rows[0][0]){
	  	request.session.user= rows[0][0]
	  	console.log(request.session.user.id)
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
		  	response.json({error:false,modulos:rows[0]})
		  }else{
		  	response.json({error:true})
		  }
		});
	}else{
		response.json({error:true})
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


exports.signIn = function(request,response){
    var cedula = request.query.cedula;
    var password = request.query.pasw;

    console.log(request.query.cedula);
    console.log(request.query.pasw);

    connection.query('call signIn("'+cedula+'","'+password+'")',function(err,rows){
            if(err) throw err;
            if (rows[0][0]) {
            	var respuesta={truly_signIn:true,id:rows[0][0],cedula:rows[0][1],
                        nombre:rows[0][2],apellido:rows[0][3],telefono:rows[0][4],
                        direccion:rows[0][5],ciudad:rows[0][6],provincia:rows[0][7],
                        distrito:rows[0][8],correo:rows[0][9]}
                response.json(respuesta);
            }
            else {
            	response.json({truly_signIn:false,estado:"Usuario_incorrecto"});
            }
        }
    );
	
};

exports.signUp = function(request,response){
    var cedula = request.body.cedula;
    var nombre = request.body.nombre;
    var apellido = request.body.apellido;
    var email = request.body.email;
    var password = request.body.password;
    var telefono = request.body.telefono;
    var direccion = request.body.direccion;
    var ciudad = request.body.ciudad;
    var provincia = request.body.provincia;
    var distrito = request.body.distrito;
    var  responseNombre;
    connection.query('call crearUsuario("'+cedula+'","'+nombre+'","'+apellido+'","'+telefono+'","'+direccion+'","'+ciudad+'","'+provincia+'","'+distrito+'","'+password+'","'+email+'","'+responseNombre+'")',function(err,rows){
        if(err) throw(err);
    response.render('index');
    });
};










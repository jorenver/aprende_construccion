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







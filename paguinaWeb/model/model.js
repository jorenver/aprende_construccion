var mysql = require("mysql");
var connection = mysql.createConnection({
    host : "80.241.222.40",
    user : "kevin",
    port : "3306",
    password : "*yIO8v3hVai0zosaD",
    database : "Sistema_Aprendizaje_Construccion"
});


connection.connect(function(err){
     if(!err){
        console.log("Base de Datos conectada con exito");
     }
     else {
        console.log("Error en la conexion de la base de datos");
     }
    }
);

exports.signIn = function(req,res){
    var cedula = req.body.cedula;
    var password = req.body.password;

    console.log(cedula);
    console.log(password);
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










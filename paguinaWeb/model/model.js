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






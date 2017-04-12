var ControllerIndex = require('./controller/ControllerIndex');
var ControllerContenido = require('./controller/ControllerContenido');

module.exports = function(app){
	//ControllerIndex
	app.get('/', ControllerIndex.login);
	app.get('/index', ControllerIndex.index);
	app.get('/getListEstudiantes',ControllerIndex.getListEstudiantes);
	app.post('/loginAdmin', ControllerIndex.loginAdmin);
	app.get('/logout',ControllerIndex.logout);
	app.get('/getNotasEstudiante',ControllerIndex.getNotasEstudiante);
	app.get('/contenido',ControllerContenido.loadContenido);
	app.get('/evaluaciones',ControllerContenido.getExamenByCapitulo);


	//control del contenido
	app.get('/adminModulos',ControllerIndex.getListEstudiantes);


};
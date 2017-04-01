var ControllerIndex = require('./controller/ControllerIndex');
var ControllerModulo = require('./controller/ControllerModulo');
var ControllerEvaluacion= require('./controller/ControllerEvaluacion');


module.exports = function(app){
	//ControllerIndex
	app.get('/', ControllerIndex.index);
	app.get('/login', ControllerIndex.login);
	app.get('/signup', ControllerIndex.signup);
	app.get('/logout', ControllerIndex.logout);
	app.get('/curso', ControllerIndex.curso);	
	app.get('/getModulos', ControllerModulo.getModulos);
	app.get('/modulo', ControllerModulo.modulo);
	app.get('/getContenidoCapitulo', ControllerModulo.getContenidoCapitulo);
	app.post('/signInUser',ControllerIndex.signInUser);
	app.post('/signUpUser',ControllerIndex.crearUsuario);
	app.get('/getCapitulos', ControllerModulo.getCapitulos);
	app.get('/evaluaciones', ControllerEvaluacion.evaluaciones);
	app.get('/getEvaluacionByIdCapitulo', ControllerEvaluacion.getEvaluacionByIdCapitulo);		
};
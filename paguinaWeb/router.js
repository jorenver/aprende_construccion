var ControllerIndex = require('./controller/ControllerIndex');
var ControllerModulo = require('./controller/ControllerModulo');


module.exports = function(app){

	//ControllerIndex
	app.get('/', ControllerIndex.index);
	app.get('/login', ControllerIndex.login);
	app.get('/signup', ControllerIndex.signup);
	app.get('/logout', ControllerIndex.logout);
	//app.get('/signInUser',ControllerIndex.signIn);
	//app.post('/signUpUser',ControllerIndex.crearUsuario);
	app.get('/curso', ControllerIndex.curso);

	
	app.get('/getModulos', ControllerModulo.getModulos);
	app.get('/modulo', ControllerModulo.modulo);

	app.get('/getCapitulos', ControllerModulo.getCapitulos);

	

	
};
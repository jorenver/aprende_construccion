var ControllerIndex = require('./controller/ControllerIndex');
var ControllerModulo = require('./controller/ControllerModulo');


module.exports = function(app){

	//ControllerIndex
	app.get('/', ControllerIndex.index);
	app.get('/login', ControllerIndex.login);
	app.get('/signup', ControllerIndex.signup);
	app.get('/curso', ControllerIndex.curso);
	app.get('/modulo', ControllerModulo.modulo);
	
};
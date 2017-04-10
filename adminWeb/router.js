var ControllerIndex = require('./controller/ControllerIndex');

module.exports = function(app){
	//ControllerIndex
	app.get('/', ControllerIndex.login);
	app.get('/index', ControllerIndex.index);
	app.get('/getListEstudiantes',ControllerIndex.getListEstudiantes);
	app.post('/loginAdmin', ControllerIndex.loginAdmin);
	app.get('/logout',ControllerIndex.logout);
	app.get('/getNotasEstudiante',ControllerIndex.getNotasEstudiante);


};
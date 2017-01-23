var ControllerIndex = require('./controller/ControllerIndex');



module.exports = function(app){

	//ControllerIndex
	app.get('/', ControllerIndex.index);
	
};
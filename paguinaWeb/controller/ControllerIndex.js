
var db = require('../model/model');


exports.index = function(request, response){
	//request.session.infoUser=null;
	response.render('index');
};
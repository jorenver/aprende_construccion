var ControllerIndex = require('./controller/ControllerIndex');
var ControllerContenido = require('./controller/ControllerContenido');
var ControllerContenidoCurso = require('./controller/ControllerContenidoCurso');

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
	app.get('/verPregunta',ControllerContenido.verPreguntaById);
	app.post('/actualizarPregunta',ControllerContenido.editarPreguntaById);
	app.get('/eliminarPregunta',ControllerContenido.eliminarPreguntaById);
	app.post('/guardarPregunta',ControllerContenido.guardarPregunta);

	//control del contenido
	app.get('/modulos',ControllerContenidoCurso.modulos);
	app.post('/agregarModulo',ControllerContenidoCurso.agregarModulo);
	app.get('/eliminarModulo',ControllerContenidoCurso.eliminarModulo);
    app.get('/getModulo',ControllerContenidoCurso.getModulo);
    app.post('/actualizarModulo',ControllerContenidoCurso.actualizarModulo);

	app.get('/capitulos',ControllerContenidoCurso.capitulos);
    app.post('/agregarCapitulo',ControllerContenidoCurso.agregarCapitulo);
    app.get('/eliminarCapitulo',ControllerContenidoCurso.eliminarCapitulo);
    app.get('/getCapitulo',ControllerContenidoCurso.getCapitulo);
    app.post('/actualizarCapitulo',ControllerContenidoCurso.actualizarCapitulo);

    app.get('/secciones',ControllerContenidoCurso.secciones);
    app.post('/agregarSeccion',ControllerContenidoCurso.agregarSeccion);
    app.get('/eliminarSeccion',ControllerContenidoCurso.eliminarSeccion);
    app.get('/getSeccion',ControllerContenidoCurso.getSeccion);
    app.post('/actualizarSeccion',ControllerContenidoCurso.actualizarSeccion);


    app.get('/parrafos',ControllerContenidoCurso.parrafos);
	app.post("/subirImagen",ControllerContenido.uploadPicture);


};
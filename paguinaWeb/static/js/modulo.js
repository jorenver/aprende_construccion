var boton=null
function getContenidoCapitulo(event){
	boton= event.target;
	idcapitulo = boton.dataset.idcapitulo;
	/*
	var request = new XMLHttpRequest();
	var url="/getContenido?";
	request.open("GET",url,true);
	request.addEventListener('load',ProcesarModulos ,false);
	request.send(null);
	*/
}

function inicializar(){
	
}

window.addEventListener('load', inicializar, false);
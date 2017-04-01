function ProcesarModulos(event){
	var respond = event.target.responseText;
	var j= JSON.parse(respond);
	if(j.error){
		window.location.href="/"; 
		return;
	}
	modulos.innerHTML=""
	for (var i = 0; i < j.modulos.length; i++) {
		var modulo= j.modulos[i];
		var item='<li><a href="/modulo?idModulo='+modulo.id+'">Modulo ' + modulo.indice+' : '+modulo.titulo+'</a></li>';
		modulos.innerHTML+=item;
		
	};
}

function getModulos(){
	var request = new XMLHttpRequest();
	var url="/getModulos";
	request.open("GET",url,true);
	request.addEventListener('load',ProcesarModulos ,false);
	request.send(null);
}

function inicializar (){
	if(id!=-1){
		getModulos();
	}
}



window.addEventListener('load', inicializar, false);
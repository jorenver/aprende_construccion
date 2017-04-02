function inicializar(){
	$(".btnEvaluacionCapitulo").click(function(event){
		window.location.href="/evaluacionCapitulo?idCapitulo="+event.target.dataset.id;
	});
	$(".btnEvaluacionModulo").click(function(event){
		window.location.href="/evaluacionModulo?idModulo="+event.target.dataset.id;
	});
}

window.addEventListener('load', inicializar, false);
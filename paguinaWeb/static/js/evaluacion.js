function inicializar(){
	$("#btnCalificar").click(function(event){
		var repestas=[]
		for(var i=0;i<$(".opciones").length;i++){
			var id_pregunta=$(".opciones")[i].dataset.id;
			var opcion_seleccionada=$("input:radio[name="+id_pregunta+"]:checked").val() ? $("input:radio[name="+id_pregunta+"]:checked").val() : 0;
			repestas.push({id_pregunta:id_pregunta,opcion_seleccionada:opcion_seleccionada});
		}
		alert(repestas);
	});
}

window.addEventListener('load', inicializar, false);
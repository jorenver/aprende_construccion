function inicializar(){
  $("#btnCalificar").click(function(event){
    var tipo=event.target.dataset.tipo;
    var id_evaluacion=event.target.dataset.id;
    var peticion={  id_evaluacion:id_evaluacion,
                    tipo:tipo,
                    respuestas:[]};
		for(var i=0;i<$(".opciones").length;i++){
			var id_pregunta=$(".opciones")[i].dataset.id;
			var opcion_seleccionada=$("input:radio[name="+id_pregunta+"]:checked").val() ? $("input:radio[name="+id_pregunta+"]:checked").val() : 0;
			peticion.respuestas.push({id_pregunta:id_pregunta,opcion_seleccionada:opcion_seleccionada});
		}
	 $.ajax({ 
          url: '/calificar',
          type: 'POST',
          data: JSON.stringify(peticion),
          contentType: 'application/json',
          success: function(data){
              if(!data.error){
                swal("Su calificacion es:", data.calificacion.toFixed(2)+"/100","success").then(function(){
                  window.location.href="/evaluaciones"
                });
              }else{
                swal("Error!", "intente mas tarde", "error").then(function(){
                  window.location.href="/"
                });
              }
          },
          error: function(){
               swal("Error!", "intente mas tarde", "error").then(function(){
                window.location.href="/"
              });
          }
        })
     });
}

window.addEventListener('load', inicializar, false);

$(document).ready(function(){
	//$("#tableEstudiantes").DataTable();

	$('#tableModulos').DataTable( {
	    language: { "sProcessing":     "Procesando...",
				    "sLengthMenu":     "Mostrar _MENU_ registros",
				    "sZeroRecords":    "No se encontraron resultados",
				    "sEmptyTable":     "Ningún dato disponible en esta tabla",
				    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
				    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
				    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
				    "sInfoPostFix":    "",
				    "sSearch":         "Buscar:",
				    "sUrl":            "",
				    "sInfoThousands":  ",",
				    "sLoadingRecords": "Cargando...",
				    "oPaginate": {
				        "sFirst":    "Primero",
				        "sLast":     "Último",
				        "sNext":     "Siguiente",
				        "sPrevious": "Anterior"
				    },
				    "oAria": {
				        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
				        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
				    }
				}
	} ); 
	$("select").css("height","100%");
	$("#btnGuardarModulo").click(function(){
		agregarModulo();
	});
});

function modalNuevoModulo(){
	$("#tituloModal").text("Nuevo Modulo");
	$("#btnActualizarModulo").hide();
	$("#btnGuardarModulo").show();
	$('#titulo-modulo').val("");
	$('#numero-modulo').val("");
	$("#modalModulo").modal("show");
}

function modalActualizarModulo(id){
	$("#tituloModal").text("Actualizar Modulo");
	$("#btnActualizarModulo").show();
	$("#btnGuardarModulo").hide();
	$('#titulo-modulo').val("titulo");
	$('#numero-modulo').val("1");
	$("#modalModulo").modal("show");
}


function eliminarModulo(id){
	swal({
          title: 'Evaluacion',
          text: "Si eliminar el modulo se eliminara todo el contenido asociado a el, ¿Esta seguro desea continuar?",
          type: 'info',
          showCancelButton: true,
          confirmButtonColor: '#00BCD4',
          cancelButtonColor: '#EF5350',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
        }).then(function () {
        	$.ajax({
		        url: "/eliminarModulo?id="+id,
		        type: "GET",
		        contentType: 'application/json',
		        data:null,
		        success: function(data) {
			        if(!data.error){
				        swal("Modulos","modulo eliminado correctamente","success").then(function(){
				        	window.location.href="/modulos"
				        });
				    }else{
				    	swal("error!","al eliminar el Modulo","error");
				    }
		        },
		        error : function() {
		        	swal("error!","al eliminar el Modulo","error");
		        }
		    });
        });
}

function agregarModulo(){
	var isValid = $('#formNuevoModulo').parsley().validate();
	if(isValid){
		datos={titulo:$('#titulo-modulo').val(),
				indice:$('#numero-modulo').val()
			};
		$.ajax({
	        url: "/agregarModulo",
	        type: "POST",
	        contentType: 'application/json',
	        data:JSON.stringify(datos),
	        success: function(data) {
		        if(!data.error){
			        swal("Modulos","modulo agregado correctamente","success").then(function(){
			        	$("#modalModulo").modal("hide");
			        	window.location.href="/modulos"
			        });
			    }else{
			    	swal("error!","al agregar el Modulo","error");
			    }
	        },
	        error : function() {
	        	swal("error!","al agregar el Modulo","error");
	        }
	    });
	}
	
}

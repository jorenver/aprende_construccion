var idCapitulo=-1;
$(document).ready(function(){
	//$("#tableEstudiantes").DataTable();

	$('#tableCapitulos').DataTable( {
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
	$("#btnGuardarCapitulo").click(function(){
		agregarCapitulo();
	});
    $("#btnActualizarCapitulo").click(function(){
        actualizarCapitulo();
    });
});

function modalNuevoCapitulo(){
	$("#tituloModal").text("Nuevo Capítulo");
	$("#btnActualizarCapitulo").hide();
	$("#btnGuardarCapitulo").show();
	$('#titulo-capitulo').val("");
	$('#numero-capitulo').val("");
	$("#modalCapitulo").modal("show");
}

function modalActualizarCapitulo(id){

    $.ajax({
        url: "/getCapitulo?id="+id,
        type: "GET",
        contentType: 'application/json',
        data:null,
        success: function(data) {
            if(!data.error){
                idCapitulo=data.capitulo.id;
                $("#tituloModal").text("Actualizar Capítulo");
                $("#btnActualizarCapitulo").show();
                $("#btnGuardarCapitulo").hide();
                $('#titulo-capitulo').val(data.capitulo.titulo);
                $('#numero-capitulo').val(data.capitulo.indice);
                $("#modalCapitulo").modal("show");
            }else{
                swal("error!","capítulo no encontrado","error");
            }
        },
        error : function() {
            swal("error!","capítulo no encontrado","error");
        }
    });
}


function eliminarCapitulo(id){
	swal({
          title: 'Capítulos',
          text: "Si eliminar el capítulo se eliminara todo el contenido asociado a el, ¿Esta seguro desea continuar?",
          type: 'info',
          showCancelButton: true,
          confirmButtonColor: '#00BCD4',
          cancelButtonColor: '#EF5350',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
        }).then(function () {
        	$.ajax({
		        url: "/eliminarCapitulo?id="+id,
		        type: "GET",
		        contentType: 'application/json',
		        data:null,
		        success: function(data) {
			        if(!data.error){
				        swal("Capítulos","capítulo eliminado correctamente","success").then(function(){
				        	window.location.href="/capitulos?id="+idModulo;
				        });
				    }else{
				    	swal("error!","al eliminar el capítulo","error");
				    }
		        },
		        error : function() {
		        	swal("error!","al eliminar el capítulo","error");
		        }
		    });
        });
}

function agregarCapitulo(){
    var isValid = $('#formNuevoCapitulo').parsley().validate();
    if(isValid){
        datos={titulo:$('#titulo-capitulo').val(),
            indice:$('#numero-capitulo').val(),
			idModulo:idModulo
        };
        $.ajax({
            url: "/agregarCapitulo",
            type: "POST",
            contentType: 'application/json',
            data:JSON.stringify(datos),
            success: function(data) {
                if(!data.error){
                    swal("Capítulos","capítulo agregado correctamente","success").then(function(){
                        $("#modalCapitulo").modal("hide");
                        window.location.href="/capitulos?id="+idModulo;
                    });
                }else{
                    swal("error!","al agregar el capítulo","error");
                }
            },
            error : function() {
                swal("error!","al agregar el capítulo","error");
            }
        });
    }

}

function actualizarCapitulo(){
    var isValid = $('#formNuevoCapitulo').parsley().validate();
    if(isValid){
        datos={id:idCapitulo,
            titulo:$('#titulo-capitulo').val(),
            indice:$('#numero-capitulo').val()
        };
        $.ajax({
            url: "/actualizarCapitulo",
            type: "POST",
            contentType: 'application/json',
            data:JSON.stringify(datos),
            success: function(data) {
                if(!data.error){
                    swal("Capítulos","capítulo actualizado correctamente","success").then(function(){
                        $("#modalCapitulo").modal("hide");
                        window.location.href="/capitulos?id="+idModulo;
                    });
                }else{
                    swal("error!","al actualizar el capítulo","error");
                }
            },
            error : function() {
                swal("error!","al actualizar el capítulo","error");
            }
        });
    }

}


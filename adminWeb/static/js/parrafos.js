/**
 * Created by jorge on 7/5/17.
 */

var idSeccion=-1;

$(document).ready(function(){
    //$("#tableEstudiantes").DataTable();

    $('#tableParrafos').DataTable( {
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
    $("#btnGuardarParrafo").click(function(){
        //agregarSeccion();
    });
    $("#btnActualizarParrafo").click(function(){
        //actualizarSeccion();
    });
});

function modalNuevoParrafo(){
    $("#tituloParrafo").text("Nueva Párrafo");
    $("#btnActualizarParrafo").hide();
    $("#btnGuardarParrafo").show();
    $('#text-parrafo').val("");
    $('#numero-parrafo').val("");
    $('#select-tipo-multimedia').val(0).trigger('change');
    $('#file-archivo').val("");
    $('#text-video').val("");
    $('#text-descripcion').val("");
    $('#text-fuente').val("");
    $('#div_multimedia').hide();
    $("#modalParrafo").modal("show");
}

function modalActualizarSeccion(id){
    $.ajax({
        url: "/getSeccion?id="+id,
        type: "GET",
        contentType: 'application/json',
        data:null,
        success: function(data) {
            if(!data.error){
                idSeccion=data.seccion.id;
                $("#tituloModal").text("Actualizar Seccíon");
                $('#titulo-seccion').val(data.seccion.titulo);
                $('#numero-seccion').val(data.seccion.indice);
                $("#btnActualizarSeccion").show();
                $("#btnGuardarSeccion").hide();
                $("#modalSeccion").modal("show");
            }else{
                swal("error!","seccíon no encontrado","error");
            }
        },
        error : function() {
            swal("error!","sección no encontrada","error");
        }
    });

}

function eliminarSeccion(id){
    swal({
        title: 'Sección',
        text: "Si eliminar la sección se eliminara todo el contenido asociado a el, ¿Esta seguro desea continuar?",
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: '#00BCD4',
        cancelButtonColor: '#EF5350',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then(function () {
        $.ajax({
            url: "/eliminarSeccion?id="+id,
            type: "GET",
            contentType: 'application/json',
            data:null,
            success: function(data) {
                if(!data.error){
                    swal("Sección","sección eliminado correctamente","success").then(function(){
                        window.location.href="/secciones?id="+idCapitulo;
                    });
                }else{
                    swal("error!","al eliminar la sección","error");
                }
            },
            error : function() {
                swal("error!","al eliminar la sección","error");
            }
        });
    });
}

function agregarParrafo(){
    var isValid = $('#formNuevoParrafo').parsley().validate();
    if(isValid){
        datos={texto:$('#text-parrafo').val(),
            indice:$('#numero-parrafo').val(),
            tipoMultimedia:$('#select-tipo-multimedia option:selected').val(),
            video:$('#text-video').val(),
            descripcion:$('#text-descripcion').val(),
            fuente:$('#text-fuente').val(),
            idSeccion:idSeccion
        };
        $.ajax({
            url: "/agregarParrafo",
            type: "POST",
            contentType: 'application/json',
            data:JSON.stringify(datos),
            success: function(data) {
                if(!data.error){
                    swal("Secciones","sección agregado correctamente","success").then(function(){
                        $("#modalSeccion").modal("hide");
                        window.location.href="/secciones?id="+idCapitulo;
                    });
                }else{
                    swal("error!","al agregar el sección","error");
                }
            },
            error : function() {
                swal("error!","al agregar el sección","error");
            }
        });
    }

}

function actualizarSeccion(){
    var isValid = $('#formNuevaSeccion').parsley().validate();
    if(isValid){
        datos={id:idSeccion,
            titulo:$('#titulo-seccion').val(),
            indice:$('#numero-seccion').val()
        };
        $.ajax({
            url: "/actualizarSeccion",
            type: "POST",
            contentType: 'application/json',
            data:JSON.stringify(datos),
            success: function(data) {
                if(!data.error){
                    swal("Sección","sección actualizado correctamente","success").then(function(){
                        $("#modalSeccion").modal("hide");
                        window.location.href="/secciones?id="+idCapitulo;
                    });
                }else{
                    swal("error!","al actualizar la seccíon","error");
                }
            },
            error : function() {
                swal("error!","al actualizar el sección","error");
            }
        });
    }

}
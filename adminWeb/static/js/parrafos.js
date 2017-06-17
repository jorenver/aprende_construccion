/**
 * Created by jorge on 7/5/17.
 */

var idParrafo=-1;

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
        agregarParrafo();
    });
    $("#btnActualizarParrafo").click(function(){
        actualizarParrafo();
    });

    $("#select-tipo-multimedia").change(function () {
        var opcion=$('#select-tipo-multimedia option:selected').val();
        if(opcion=="ninguna"){
            $('#div_multimedia').hide();
        }
        if(opcion=="foto"){
            $('#div_video').hide();
            $('#div_imagen').show();
            $('#div_multimedia').show();
        }
        if(opcion=="video"){
            $('#div_video').show();
            $('#div_imagen').hide();
            $('#div_multimedia').show();
        }
        if(opcion=="no"){
            $('#div_video').hide();
            $('#div_imagen').hide();
            $('#div_multimedia').hide();
        }
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

function modalActualizarParrafo(id){
    $.ajax({
        url: "/getParrafo?id="+id,
        type: "GET",
        contentType: 'application/json',
        data:null,
        success: function(data) {
            if(!data.error){
                idParrafo=data.parrafo.id;
                $("#tituloParrafo").text("Actualizar Párrafo");
                $('#text-parrafo').val(data.parrafo.texto);
                $('#numero-parrafo').val(data.parrafo.indice);
                $('#file-archivo').val("");
                if(data.parrafo.tipo_multimedia=="video"){
                    $('#text-video').val(data.parrafo.ruta_multimedia);
                }
                $('#text-descripcion').val(data.parrafo.descripcion_multimedia);
                $('#text-fuente').val(data.parrafo.fuente_multimedia);
                $("#btnActualizarParrafo").show();
                $("#btnGuardarParrafo").hide();
                $('#select-tipo-multimedia').val(data.parrafo.tipo_multimedia).trigger('change');
                $("#modalParrafo").modal("show");
            }else{
                swal("error!","párrafo no encontrado","error");
            }
        },
        error : function() {
            swal("error!","párrafo no encontrada","error");
        }
    });

}

function eliminarParrafo(id){
    swal({
        title: 'Párrafo',
        text: "Si elimina la párrafo se eliminara todo el contenido asociado a el, ¿Esta seguro desea continuar?",
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: '#00BCD4',
        cancelButtonColor: '#EF5350',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then(function () {
        $.ajax({
            url: "/eliminarParrafo?id="+id,
            type: "GET",
            contentType: 'application/json',
            data:null,
            success: function(data) {
                if(!data.error){
                    swal("Párrafo","párrafo eliminado correctamente","success").then(function(){
                        window.location.href="/parrafos?id="+idSeccion;
                    });
                }else{
                    swal("error!","al eliminar la párrafo","error");
                }
            },
            error : function() {
                swal("error!","al eliminar la párrafo","error");
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
                    swal("Párrafos","Párrafo agregado correctamente","success").then(function(){
                        $("#modalSeccion").modal("hide");
                        window.location.href="/parrafos?id="+idSeccion;
                    });
                }else{
                    swal("error!","al agregar el párrafo","error");
                }
            },
            error : function() {
                swal("error!","al agregar el párrafo","error");
            }
        });
    }

}

function actualizarParrafo(){
    var isValid = $('#formNuevoParrafo').parsley().validate();
    if(isValid){
        datos={
            id:idParrafo,
            texto:$('#text-parrafo').val(),
            indice:$('#numero-parrafo').val(),
            tipoMultimedia:$('#select-tipo-multimedia option:selected').val(),
            video:$('#text-video').val(),
            descripcion:$('#text-descripcion').val(),
            fuente:$('#text-fuente').val(),
            idSeccion:idSeccion
        };
        $.ajax({
            url: "/actualizarParrafo",
            type: "POST",
            contentType: 'application/json',
            data:JSON.stringify(datos),
            success: function(data) {
                if(!data.error){
                    swal("Párrafo","párrafo actualizado correctamente","success").then(function(){
                        $("#modalParrafo").modal("hide");
                        window.location.href="/parrafos?id="+idSeccion;
                    });
                }else{
                    swal("error!","al actualizar el párrafo","error");
                }
            },
            error : function() {
                swal("error!","al actualizar el párrafo","error");
            }
        });
    }

}

function modalVerParrafo(id){
    $.ajax({
        url: "/getParrafo?id="+id,
        type: "GET",
        contentType: 'application/json',
        data:null,
        success: function(data) {
            if(!data.error){
                idParrafo=data.parrafo.id;

                $('#vista_previa_parrafo').text(data.parrafo.texto);

                $("#div_vista_previa_multimedia").hide();
                $("#modalVistaPreviaParrafo").modal("show");
            }else{
                swal("error!","párrafo no encontrado","error");
            }
        },
        error : function() {
            swal("error!","párrafo no encontrada","error");
        }
    });

}
/**
 *
 *
 * @description Esta función obtendrá la información contenidos en los widget de los modal de editar y guardar
 * @param data
 * @returns
 */

var datos = {
    id : 0,
    correcta: 0
};
var data = {
    id:0,
    pregunta:"",
    opcion1:"",
    opcion2:"",
    opcion3:"",
    opcion4:"",
    capituloPregunta:"",
    moduloPregunta:"",
    tipoMultimedia:"",
    ruta:null,
    imagen1:"",
    imagen2:"",
    imagen3:"",
    imagen4:"",
    correcta:0
};



function serializarInformacionCrearPregunta(datos){

        data.id = datos.id;
        data.pregunta = $("#txtPreguntaModalCrearPregunta");
        data.opcion1 = $("#opcion1ModalCrearPregunta");
        data.opcion2 = $("#opcion2ModalCrearPregunta");
        data.opcion3 = $("#opcion3ModalCrearPregunta");
        data.opcion4 = $("#opcion4ModalCrearPregunta");
        data.correcta = datos.correcta;


        return data;
  }

function serializarInformacionEditarPregunta(datos){

    data.id = datos.id;
    data.pregunta = $("#txtPreguntaModalEditarPregunta");
    data.opcion1 = $("#opcion1ModalEditarPregunta");
    data.opcion2 = $("#opcion2ModalEditarPregunta");
    data.opcion3 = $("#opcion3ModalEditarPregunta");
    data.opcion4 = $("#opcion4ModalEditarPregunta");
    data.correcta = datos.correcta;


    return data;
}

  /**
   * @Descripcion: Esta funcion hace una llamada a ajax a un servicio que le devuelva un objeto json pregunta enviandole un id correspondiente
   * a la pregunta en consultar, despues construimos ese objeto con la vista correspondiente.
   * El objeto json a recibir debe tener la siguiente forma:
   * pregunta{
   *  pregunta:"",
   *  opcion1:"",
   *  opcion2:"",
   *  opcion3:"",
   *  opcion4:"",
   *  correcta:"",
   *  imagen1:"",
   *  imagen2:"",
   *  imagen3:"",
   *  imagen4:"",
   *  ruta:"",
   *  tipoMultimedia:""
   * }
   * 
   * 
   */

    $(".btnVerPregunta").on('click',function(event){
        $.ajax({
            url:'/verPregunta?id='+event.target.dataset.id,
            type: "GET",
            dataType:"json",
            contentType:"application/json; charset=utf8",
            data:null,
            success: function(data){
            $("#descripcionVerPregunta").text($("#descripcionPregunta").text());
            $("#txtPreguntaModalVerPregunta").val(data.pregunta.pregunta);
            $("#opcion1ModalVerPregunta").val(data.pregunta.opcion1);
            $("#opcion2ModalVerPregunta").val(data.pregunta.opcion2);
            $("#opcion3ModalVerPregunta").val(data.pregunta.opcion3);
            $("#opcion4ModalVerPregunta").val(data.pregunta.opcion4);
            switch (data.pregunta.correcta){
                case 1:
                    $("#resp1ModalVerPregunta").prop('checked',true);
                    break;

                case 2:
                    $("#resp2ModalVerPregunta").prop('checked',true);
                    break;

                case 3:
                    $("#resp3ModalVerPregunta").prop("checked",true);
                    break;

                case 4:
                    $("#resp4ModalVerPregunta").prop("checked",true);
                    break;

            }
            $("#verPregunta").modal();

            },
            error: function(data){
                swal({
                    type: "error",
                    title: "Error en la red",
                    text: "Existen problemas en la red, por favor vuélvalo a intentar mas tarde"
                });
            }
        });
    });
    
    $(".btnEditarPregunta").on('click',function(event){
        $.ajax({
            url:'/verPregunta?id='+event.target.dataset.id,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf8",
            data:null,
            success: function(data){
                datos.id = data.id;
                $("#descripcionEditarPregunta").text($("#descripcionPregunta").text());
                $("#txtPreguntaModalEditarPregunta").val(data.pregunta.pregunta);
                $("#opcion1ModalEditarPregunta").val(data.pregunta.opcion1);
                $("#opcion2ModalEditarPregunta").val(data.pregunta.opcion2);
                $("#opcion3ModalEditarPregunta").val(data.pregunta.opcion3);
                $("#opcion4ModalEditarPregunta").val(data.pregunta.opcion4);
                switch (data.pregunta.correcta){
                    case 1:
                        $("#resp1ModalEditarPregunta").prop('checked',true);
                        break;

                    case 2:
                        $("#resp2ModalEditarPregunta").prop('checked',true);
                        break;

                    case 3:
                        $("#resp3ModalEditarPregunta").prop("checked",true);
                        break;

                    case 4:
                        $("#resp4ModalEditarPregunta").prop("checked",true);
                        break;

                }
                 $("#editarPregunta").modal();
            },
            error: function(data){
                swal({
                    type: "error",
                    title: "Error en la red",
                    text: "Existen problemas en la red, por favor vuélvalo a intentar mas tarde"
                });
            }
        });
    });

    $(".btnEliminarPregunta").on('click',function(event){
        swal({
            title:"Eliminar Pregunta",
            type: "question",
            text: "Eliminará de forma permanente esta pregunta de la Base de Datos, Desea eliminar esta pregunta?",
            showConfirmButton: true,
            showCancelButton: true,
            ConfirmButton: "Si",
            CancelButton: "No"
        }).then(function(){
                $.ajax({
                    url:'/eliminarPregunta?id='+event.target.dataset.id,
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf8',
                    data: null,
                    success: function(data){
                        if(data.exito){
                            swal({
                            type: "success",
                            title: "Eliminación correcta",
                            text: "Se ha eliminado de manera satisfactoria los datos"
                            });

                        }
                        else{
                            swal({
                            type: "error",
                            title: "Error en la actualización",
                            text: "Existio un error al eliminar la pregunta"
                            });
                        }
                    },
                    error: function(data){
                        swal({
                            type: "error",
                            title: "Error en la red",
                            text: "Existen problemas en la red, por favor vuélvalo a intentar mas tarde"
                        });
                    }
              });
        });

    });


    $("#btnAgregarPregunta").on('click',function(event){
       guardarPregunta()
    });

    $("#btnActualizarPregunta").on('click',function(event){
        actualizarPregunta(event);

    });

        function guardarPregunta(){

                    if($("#resp1ModalCrearPregunta").is(':checked')){
                        datos.correcta = 1;

                    }
                    else if($("#resp2ModalCrearPregunta").is(':checked')){
                        datos.correcta = 2;

                    }
                    else if($("#resp3ModalCrearPregunta").is(':checked')){
                        datos.correcta = 3;

                    }
                    else{
                        datos.correcta = 4;
                    }

                    var data = serializarInformacionCrearPregunta(datos);

                    $.ajax({
                        url:"/guardarPregunta",
                        type:"POST",
                        data: JSON.stringify(data),
                        dataType: "json",
                        contentType: 'application/json; charset=utf8',
                        success: function(data){
                            if(data.exito== true){
                                swal({
                                    type:"success",
                                    title:"Registro Exitoso",
                                    text: "La pregunta ha sido registrada de manera exitosa en la base de datos"
                                });

                            }
                            else{
                                swal({
                                    type:"error",
                                    title:"Registro Fallido",
                                    text: "Existe problemas en el servidor, por favor vuelva a intentarlo mas tarde"
                                });
                            }
                        },
                        error: function(data){
                            swal({
                                type: "error",
                                title: "Error en la red",
                                text: "Existen problemas en la red, por favor vulevalo a intentar mas tarde"
                            });
                        }
                    });
        }

        function actualizarPregunta(event){

                    if($("#resp1ModalEditarPregunta").is(':checked')){
                        datos.correcta = 1;

                    }
                    else if($("#resp2ModalEditarPregunta").is(':checked')){
                        datos.correcta = 2;

                    }
                    else if($("#resp3ModalEditarPregunta").is(':checked')){
                        datos.correcta = 3;

                    }
                    else{
                        datos.correcta = 4;
                    }

                    var data = serializarInformacionEditarPregunta(datos);



                     $.ajax({
                        url:'/actualizarPregunta',
                        type:'POST',
                        dataType:'json',
                        contentType:'application/json; charset=utf8',
                        data:JSON.stringify(data),
                        success: function(data){
                            if(data.exito){
                                swal({
                                    type: "success",
                                    title: "Actualización correcta",
                                    text: "Se ha actualizado de forma satisfactoria los datos"
                                });
                            }
                            else{
                                swal({
                                    type: "error",
                                    title: "Actualización fallida",
                                    text: "No se pudo actualizar la información ingresada"
                                });

                            }

                        },
                        error: function(data){
                            swal({
                                type: "error",
                                title: "Error en la red",
                                text: "Existen problemas en la red, por favor vulevalo a intentar mas tarde"
                            });
                        }

                    });
        }
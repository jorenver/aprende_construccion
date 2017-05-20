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
    capituloPregunta:0,
    moduloPregunta:0,
    tipoMultimedia:"",
    ruta:"",
    imagen1:"",
    imagen2:"",
    imagen3:"",
    imagen4:"",
    correcta:0
};


function serializarInformacionCrearPregunta(datos){

        data.pregunta = $("#txtPreguntaModalCrearPregunta").val();
        data.opcion1 = $("#opcion1ModalCrearPregunta").val();
        data.opcion2 = $("#opcion2ModalCrearPregunta").val();
        data.opcion3 = $("#opcion3ModalCrearPregunta").val();
        data.opcion4 = $("#opcion4ModalCrearPregunta").val();
        data.capituloPregunta = parseInt($("#idCapitulo").text());
        data.moduloPregunta = parseInt($("#idModulo").text());
        data.correcta = datos.correcta;


        return data;
  }

function serializarInformacionEditarPregunta(datos){
    data.id = datos.id;
    data.pregunta = $("#txtPreguntaModalEditarPregunta").val();
    data.opcion1 = $("#opcion1ModalEditarPregunta").val();
    data.opcion2 = $("#opcion2ModalEditarPregunta").val();
    data.opcion3 = $("#opcion3ModalEditarPregunta").val();
    data.opcion4 = $("#opcion4ModalEditarPregunta").val();
    data.capituloPregunta = parseInt($("#idCapitulo").text());
    data.moduloPregunta = parseInt($("#idModulo").text());
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
        datos.id = event.target.dataset.id;
        $.ajax({
            url:'/verPregunta?id='+event.target.dataset.id,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf8",
            data:null,
            success: function(data){
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
                    text: "Existen problemas en la red, por favor vuélvalo a intentar mas tarde",
                    confirmButtonColor: '#00BCD4',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    });

    $(".btnEliminarPregunta").on('click',function(event){
        var item = event.target.dataset.id;

        swal({
            title:"Eliminar Pregunta",
            type: "question",
            text: "Eliminará de forma permanente esta pregunta de la Base de Datos, Desea eliminar esta pregunta?",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
            confirmButtonColor: '#00BCD4',
            cancelButtonColor:  '#EF5350'
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
                                        text: "Se ha eliminado de manera satisfactoria los datos",
                                        confirmButtonColor: '#00BCD4',
                                        confirmButtonText: 'Aceptar'
                                    }).then(function () {
                                        $("table#tablePregunta tr#"+item+"").remove();
                                    });
                        }
                        else{
                                swal({
                                    type: "error",
                                    title: "Error en la actualización",
                                    text: "Existio un error al eliminar la pregunta",
                                    confirmButtonColor: '#00BCD4',
                                    confirmButtonText: 'Aceptar'
                            });
                        }
                    },
                    error: function(data){
                        swal({
                            type: "error",
                            title: "Error en la red",
                            text: "Existen problemas en la red, por favor vuélvalo a intentar mas tarde",
                            confirmButtonColor: '#00BCD4',
                            confirmButtonText: 'Aceptar'
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
            if($("#formularioPreguntas").parsley().validate()){

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
                                text: "La pregunta ha sido registrada de manera exitosa en la base de datos",
                                confirmButtonColor: '#00BCD4',
                                confirmButtonText: 'Aceptar'
                            }).then(function () {
                                $("#crearPregunta").modal('toggle');
                                window.location.href="/evaluaciones?id="+ parseInt($("#idCapitulo").text());
                            });

                        }
                        else{
                            swal({
                                type:"error",
                                title:"Registro Fallido",
                                text: "Existe problemas en el servidor, por favor vuelva a intentarlo mas tarde",
                                confirmButtonColor: '#00BCD4',
                                confirmButtonText: 'Aceptar'
                            });
                        }
                    },
                    error: function(data){
                        swal({
                            type: "error",
                            title: "Error en la red",
                            text: "Existen problemas en la red, por favor vulevalo a intentar mas tarde",
                            confirmButtonColor: '#00BCD4',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                });

            }
            else{
                swal({
                    type:"error",
                    title:"Campos vacios",
                    text:"Existen campos vacios que deben ser llenados",
                    confirmButtonColor: '#00BCD4',
                    confirmButtonText: 'Aceptar'
                });
            }

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
                                    text: "Se ha actualizado de forma satisfactoria los datos",
                                    confirmButtonColor: '#00BCD4',
                                    confirmButtonText: 'Aceptar'
                                }).then(function () {
                                    window.location.href="/evaluaciones?id="+ parseInt($("#idCapitulo").text());

                                });
                            }
                            else{
                                swal({
                                    type: "error",
                                    title: "Actualización fallida",
                                    text: "No se pudo actualizar la información ingresada",
                                    confirmButtonColor: '#00BCD4',
                                    confirmButtonText: 'Aceptar'
                                });

                            }

                        },
                        error: function(data){
                            swal({
                                type: "error",
                                title: "Error en la red",
                                text: "Existen problemas en la red, por favor vulevalo a intentar mas tarde",
                                confirmButtonColor: '#00BCD4',
                                confirmButtonText: 'Aceptar'
                            });
                        }

                    });
        }


        $("#btnSubmit").on('click',function (event) {
            event.preventDefault();
            var imagen = new FormData($("#formularioPreguntas")[0]);
            imagen.append('imgUploader',$("#loadImage").files);
            $.ajax({
                type:"POST",
                url:"/subirImagen",
                data: imagen,
                cache:false,
                contentType:false,
                processData:false,
                success: function (data) {
                    console.log("exitos");

                },
                error: function (data) {
                    console.log("error");
                }
            });
        });

$('#loadImage').change( function(event) {

    $("#showImage").fadeIn("fast").attr('src',URL.createObjectURL(event.target.files[0]));
});

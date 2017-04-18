
  var data = {
      id:"",
      pregunta:"",
      opcion1:"",
      opcion2:"",
      opcion3:"",
      opcion4:"",
      capituloPregunta:"",
      moduloPregunta:"",
      tipoMultimedia:"",
      ruta:"",
      imagen1:"",
      imagen2:"",
      imagen3:"",
      imagen4:"",
      correcta:""
  }

    $(".btnVerPregunta").on('click',function(event){
        $.ajax({
            url:'/verPregunta?id='+event.target.dataset.id,
            type: "GET",
            dataType:"json",
            contentType:"application/json: charset=utf8",
            data:null,
            success: function(data){

                $("#verPregunta").style.display = "block";

            },
            error: function(data){
                swal({
                    type: "error",
                    title: "Error en la red",
                    text: "Existen problemas en la red, por favor vulevalo a intentar mas tarde",
                });
            }
        
        });
    });
    
    $(".btnEditarPregunta").on('click',function(event){
        $.ajax({
            url:'/verPregunta?id='+event.target.dataset.id,
            type: "GET",
            dataType: "json",
            contentType: "application/json: charset=utf8",
            data:null,
            success: function(data){
                 $("#editarPregunta").style.display = "block";
                
            },
            error: function(data){

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
                    contentType: 'application/json: charset=utf8',
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
                            text: "Existen problemas en la red, por favor vulevalo a intentar mas tarde"
                        });
                    }
              });
        });

    });

    function guardarPregunta(data){
        $.ajax({
            url:"/guardarPregunta",
            type:"POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json: charset=utf8',
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

    function actualizarPregunta(data){
         $.ajax({
            url:'/actualizarPregunta?id='+event.target.dataset.id,
            type:'POST',
            dataType:'json',
            contentType:'application/json: charset=utf8',
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

        });}
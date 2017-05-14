//inicializar estados de la pagina
$("button[id='idSignUp']").disabled=true;
var userInformation = {};
flagWindow = false;
userInformation.distrito = "null";
userInformation.provincia = "null";



function verificarPassword(password,repassword){
  if(password==repassword && password.length != 0 && repassword.length != 0){
    return true;
  }
  return false;
}





$("button[id='idSignUp']").click(function(){
  userInformation.cedula = $("input[id='signup-cedula']").val();
  userInformation.nombre = $("input[id='signup-nombre']").val();
  userInformation.apellido = $("input[id='signup-apellido']").val();
  userInformation.correo = $("input[id='signup-email']").val();
  userInformation.password = $("input[id='signup-password']").val();
  userInformation.telefono = $("input[id='signup-telefono']").val();
  userInformation.direccion = $("input[id='signup-direccion']").val();
  userInformation.ciudad = $("input[id='signup-ciudad']").val();
  if(verificarPassword($("input[id='signup-password']").val(),$("input[id='signup-re-password']").val())){
        if($("#formulario_registro").parsley().validate()){
            $.ajax({
                type:'POST',
                url:'/signUpUser',
                data:JSON.stringify(userInformation),
                dataType:'json',
                contentType:"application/json;charset=UTF-8",
                success:function(data){
                    if (data.estado == "No_Guardado") {
                        flagWindow = false;
                    }
                    else{
                        flagWindow = true;
                    }
                },
                error:function(textStatus){
                    swal({
                        type: "error",
                        title: "Error Desconocido",
                        text: "Existió un problema con la conección del red del servidor, vuélvalo a intentar mas tarde",
                        confirmButtonColor: '#00BCD4',
                        confirmButtonText: 'Aceptar'
                    });

                },
                complete:function(){
                    if (flagWindow==true) {
                        swal({
                            type: "success",
                            title: "Registro Guardado",
                            text: "El usuario " +userInformation.nombre+ " ha sido registrado de manera exitosa en el sistema",
                            confirmButtonColor: '#00BCD4',
                            confirmButtonText: 'Aceptar'
                        }).then(function(){
                            window.location.href="/";
                        });
                    }
                    else{
                        swal({
                            type: "error",
                            title: "Error Desconocido",
                            text: "Existió un problema con la conección del red del servidor, vuélvalo a intentar mas tarde",
                            confirmButtonColor: '#00BCD4',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                },
                timeout: 40000
            });
        }
        else{
            swal({
                type: "error",
                title: "Error en el registro",
                text: "Existen datos nulos o mal ingresados, por favor corregirlos",
                confirmButtonColor: '#00BCD4',
                confirmButtonText: 'Aceptar'
            });
        }
  }
  else{
      swal({
          type: "error",
          title: "error en el ingreso de contraseña",
          text: "Las contraseñas ingresadas no coinciden",
          confirmButtonColor: '#00BCD4',
          confirmButtonText: 'Aceptar'
      });
  }

});



$("ul[id='menuProvincia'] li ").on('click',function(){
    $("button[id='signup-provincia']").text($(this).text());
    userInformation.provincia = $(this).text();

});


$("ul[id='menuDistrito'] li ").on('click',function(){
    $("button[id='signup-distrito']").text($(this).text());
    userInformation.distrito =  $(this).text();

});


//inicializar estados de la pagina
$("button[id='idSignUp']").disabled=true;
$("#ErrorInputCedula").hide();
$("#ErrorInputName").hide();
$("#ErrorInputApellido").hide();
$("#ErrorInputEmail").hide();
$("#ErrorInputTelefono").hide();
$("#passwordsIncorrectas").hide();
 $("#idDataInconcluso").hide();
var userInformation = {};
flagWindow = false;
var validadorCedula = false;
var validadorNombre = false;
var validadorApellido = false;
var validadorCorreo = false;
var validadorContrasena = false;
var validadorTelefono = false;
userInformation.distrito = "null";
userInformation.provincia = "null";

function verificarRightNumber(textCedula){
    console.log(textCedula);
    if(Number(textCedula)==NaN || textCedula.length !=10 ){
      return false;
    }
    return true;
}

function verificarRightTelephone(textTelefono){
    console.log(textTelefono);
    if(Number(textTelefono)==NaN || textTelefono.length != 10){
      return false;
    }
    return true;
}

function verificarRightString(txtName){
  regExp = /^([^0-9_@./#&+-]*)$/;
  console.log(regExp.test(txtName))
  if(regExp.test(txtName) && txtName.length != 0){
    return true;
  }
  return false;
}

function varificarEmail(txtEmail){
  console.log(txtEmail);
  
  regExp = /([@])/;
  console.log(regExp.test(txtEmail));
  if (regExp.test(txtEmail) && txtEmail.length !=0) {
    return true;
  }
  return false;
}

function inicializar(){
  $("#ErrorInputCedula").hide();
  $("#ErrorInputName").hide();
  $("#ErrorInputApellido").hide();
  $("#ErrorInputEmail").hide();
  $("#ErrorInputTelefono").hide();
  $("#passwordsIncorrectas").hide();
  //$("#myModal").hide();
  $("#myModalSuccessRequest").hide();
  $("#myModalFailRequest").hide();
   $("#idDataInconcluso").hide();
  //$("button[id='idSignUp']").on("click",function(e){
    //    e.preventDefault;
  //});
}
function verificarPassword(password,repassword){
  console.log(password);
  console.log(repassword);
  if(password==repassword && password.length != 0 && repassword.length != 0){
    return true;
  }
  return false;
}

$("input[id='signup-cedula']").focus(function(){
    //$("#myModal").hide();
     $("#idDataInconcluso").hide();
      $("button[id='idSignUp']").prop('disabled',false);


});

$("input[id='signup-nombre']").focus(function(){
  $("button[id='idSignUp']").prop('disabled',false);
  //$("#myModal").hide();
   $("#idDataInconcluso").hide();


  console.log("estoy en nombre");
    if(!verificarRightNumber($("input[id='signup-cedula']").val())){
      $("#ErrorInputCedula").show();
      validadorCedula =false;
     $("input[id='signup-cedula']").closest('.form-group').addClass('has-error has-feedback');


    }
    else{
       $("#ErrorInputCedula").hide();
       $("input[id='signup-cedula']").closest('.form-group').addClass('has-success has-feedback');
       $("input[id='signup-cedula']").closest('.form-group').removeClass('has-error has-feedback');
       validadorCedula = true;
    }

});


$("input[id='signup-apellido']").focus(function(){
  $("button[id='idSignUp']").prop('disabled',false);
  //$("#myModal").hide();
 $("#idDataInconcluso").hide();

  console.log("estoy en apellido");
    if(!verificarRightString($("input[id='signup-nombre']").val())){
      $("#ErrorInputName").show();
      $("input[id='signup-nombre']").closest('.form-group').addClass('has-error has-feedback');
      validadorNombre =false;

    }
    else{
       $("#ErrorInputName").hide();
       $("input[id='signup-nombre']").closest('.form-group').addClass('has-success has-feedback');
       $("input[id='signup-nombre']").closest('.form-group').removeClass('has-error has-feedback');
       validadorNombre = true;
    }

});



$("input[id='signup-email']").focus(function(){
  $("button[id='idSignUp']").prop('disabled',false);
  //$("#myModal").hide();
 $("#idDataInconcluso").hide();

  console.log("estoy en email");
    if(!verificarRightString($("input[id='signup-apellido']").val())){
      console.log($("input[id='signup-apellido']").val());
      $("#ErrorInputApellido").show();
      $("input[id='signup-apellido']").closest('.form-group').addClass('has-error has-feedback');
      validadorApellido = false;

    }
    else{
       $("#ErrorInputApellido").hide();
       $("input[id='signup-apellido']").closest('.form-group').addClass('has-success has-feedback');
       $("input[id='signup-apellido']").closest('.form-group').removeClass('has-error has-feedback');
       validadorApellido=true;
    }

});

$("input[id='signup-direccion']").focus(function(){
  $("button[id='idSignUp']").prop('disabled',false);
  //$("#myModal").hide();
   $("#idDataInconcluso").hide();


  console.log("direccion");
    if(!verificarRightTelephone($("input[id='signup-telefono']").val())){
        $("#ErrorInputTelefono").show();
        $("input[id='signup-telefono']").closest('.form-group').addClass('has-error has-feedback');
        validadorTelefono=false;
    }
    else{
      $("#ErrorInputTelefono").hide();
      $("input[id='signup-telefono']").closest('.form-group').removeClass('has-error has-feedback');
      $("input[id='signup-telefono']").closest('.form-group').addClass('has-success has-feedback');
        validadorTelefono=true;
    }
  }
);


$("input[id='signup-password']").focus(function(){
  //$("#myModal").hide();
   $("#idDataInconcluso").hide();

  $("button[id='idSignUp']").prop('disabled',false);
  console.log("password");
    if(!varificarEmail($("input[id='signup-email']").val())){
        $("#ErrorInputEmail").show();
        $("input[id='signup-email']").closest('.form-group').addClass('has-error has-feedback');
        validadorCorreo=false;
    }
    else{
      $("#ErrorInputEmail").hide();
      $("input[id='signup-email']").closest('.form-group').removeClass('has-error has-feedback');
      $("input[id='signup-email']").closest('.form-group').addClass('has-success has-feedback');
        validadorCorreo=true;
    }
  }
);

$("input[id='signup-telefono']").focus(function(){
  $("button[id='idSignUp']").prop('disabled',false);
  //$("#myModal").hide();
 $("#idDataInconcluso").hide();

  console.log("telefono");
    if(!verificarPassword($("input[id='signup-password']").val(),$("input[id='signup-re-password']").val())){
        $("#passwordsIncorrectas").show();
        $("input[id='signup-password']").closest('.form-group').addClass('has-error has-feedback');
        validadorContrasena=false;
    }
    else{
      $("#passwordsIncorrectas").hide();
      $("input[id='signup-password']").closest('.form-group').removeClass('has-error has-feedback');
      $("input[id='signup-password']").closest('.form-group').addClass('has-success has-feedback');
        validadorContrasena=true;
    }
  }
);
$("#buttonRegister").mouseover(function(){
   console.log("entro");
   console.log(validadorCedula);
   console.log(validadorNombre);
   console.log(validadorApellido);
   console.log(validadorCorreo);
   console.log(validadorContrasena);
   console.log(validadorTelefono);

   console.log((validadorCedula && validadorNombre && validadorApellido && validadorCorreo && validadorContrasena  && validadorTelefono ));
    if (!(validadorCedula && validadorNombre && validadorApellido && validadorCorreo && validadorContrasena  && validadorTelefono)) {
      $("button[id='idSignUp']").prop('disabled',true);
      $("#idDataInconcluso").show();
      //$("#myModal").modal();
    }
    else {
      $("button[id='idSignUp']").prop('disabled',false);
       $("#idDataInconcluso").hide();
    } 
});


$("button[id='idSignUp']").click(function(){
  userInformation.cedula = $("input[id='signup-cedula']").val();
  userInformation.nombre = $("input[id='signup-nombre']").val();
  userInformation.apellido = $("input[id='signup-apellido']").val();
  userInformation.correo = $("input[id='signup-email']").val();
  userInformation.password = $("input[id='signup-password']").val();
  userInformation.telefono = $("input[id='signup-telefono']").val();
  userInformation.direccion = $("input[id='signup-direccion']").val();
  userInformation.ciudad = $("input[id='signup-ciudad']").val();
  //$("#myModal").hide();
  //login del admin
  console.log(userInformation);
   $.ajax({
        type:'POST',
        url:'/signUpUser',
        data:JSON.stringify(userInformation),
        dataType:'json',
        contentType:"application/json;charset=UTF-8",
        success:function(data){
          console.log("correcto");
          console.log(data);
          if (data.estado == "No_Guardado") {
            flagWindow = false;
          }
          else{
           flagWindow = true;
            //window.location.href="/";
          }
        },
        error:function(textStatus){
            console.log("fallo");
            console.log(textStatus);
            $("#myModalFailRequest").modal();


        },
        complete:function(){
          //$("#myModal").hide();
          if (flagWindow==true) {
             $("#myModalSuccessRequest").modal();
          }
          else{
             $("#myModalFailRequest").modal();
          }
        

        },
        timeout: 40000
      });
      
});

$("button[id='buttonRegister']").click(function(e){
 $("input[id='signup-cedula']").val('');
 $("input[id='signup-nombre']").val('');
 $("input[id='signup-apellido']").val('');
 $("input[id='signup-email']").val('');
 $("input[id='signup-password']").val('');
 $("input[id='signup-telefono']").val('');
 $("input[id='signup-direccion']").val('');
 $("input[id='signup-ciudad']").val('');
 window.location.href='/';



});


$("ul[id='menuProvincia'] li ").on('click',function(){
    $("button[id='signup-provincia']").text($(this).text());
    userInformation.provincia = $(this).text();

});


$("ul[id='menuDistrito'] li ").on('click',function(){
    $("button[id='signup-distrito']").text($(this).text());
    userInformation.distrito =  $(this).text();

});

window.addEventListener('load', inicializar, false);

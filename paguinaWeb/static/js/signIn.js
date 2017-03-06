var dictUser = {};
var contadorCedula=0;
var InputCedulaUser="";
$("#passwordsNoMatchRegister").hide();
$("#ErrorCedula").hide();
$("#ErrorTextoCedula").hide();


function inicializar(){
    $("button[id='btnSignIn']").on("click",function(e){
        e.preventDefault;
    });
    document.getElementById("btnSignIn").addEventListener("click",loginUsuario,false);
}

function verifyRightText(textCedula){
        console.log(Number(textCedula));
        if(Number(textCedula)==NaN){
            return false;
        }
    return true;

}

$("input[id='login-cedula']").keypress(function(event){
  contadorCedula += 1;
  InputCedulaUser = InputCedulaUser + event.key;
  console.log(InputCedulaUser);
  console.log(contadorCedula);
});

$("input[id='login-cedula']").focus(function(){
    InputCedulaUser=$("input[id='login-cedula']").val();
    console.log(InputCedulaUser.length);
    contadorCedula = InputCedulaUser.length;
});

$("input[id='login-password']").focus(function(){
    console.log("estoy en password");
    console.log(InputCedulaUser);
    if(contadorCedula != 10 || verifyRightText(InputCedulaUser)==false){
        $("#ErrorCedula").show();
        $("input[id='login-cedula']").closest('.form-group').addClass('has-error has-feedback');
    }
    else{
        $("#ErrorCedula").hide();
        $("#ErrorTextoCedula").hide();
        $("input[id='login-cedula']").closest('.form-group').removeClass('has-error has-feedback');
        $("input[id='login-cedula']").closest('.form-group').addClass('has-success has-feedback'); 
    }
});



function redireccionarLogin(event){
    var response = JSON.parse(event.target.responseText);
    console.log(response);
    if (response.truly_signIn != false) {
        window.location.href="/curso";
    }
    else{
        $("#passwordsNoMatchRegister").show();
    }
}


function loginUsuario(){
    cedula = $('#login-cedula').val();
    password = $('#login-password').val();
    datos = {cedula:cedula,password:password};
    var request = new XMLHttpRequest();
    var url = '/signInUser';
    request.open("POST",url,true);
    request.addEventListener('load',redireccionarLogin,false);
    request.setRequestHeader("Content-type","application/json;charset=UTF-8");
    request.send(JSON.stringify(datos));
    setTimeout(function(){
        request.abort();
    },40000);
}



window.addEventListener('load', inicializar, false);

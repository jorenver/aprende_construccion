var dictUser = {};
var contadorCedula=0;
var InputCedulaUser="";
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

function redireccionarLogin(event){
    var response = JSON.parse(event.target.responseText);
    console.log(response);
    if (response.truly_signIn != false) {
        window.location.href="/curso";
    }
    else{
        swal({
            type: "error",
            title: "Acceso denegado",
            text: "La contraseña o cedula ingresada son incorrectas, vuelva a intentarlo",
            confirmButtonColor: '#00BCD4',
            confirmButtonText: 'Aceptar'
        });
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

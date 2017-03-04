var dictUser = {};
$("#passwordsNoMatchRegister").hide();

function inicializar(){
    $("form#btnSignIn").on("click",function(e){
        e.preventDefault;
    });
    document.getElementById("btnSignIn").addEventListener("click",loginUsuario,false);
}

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

var dict= {}
$("#btnSignInAdmin").on('click',function(){
    dict.ced= $("#login-cedula").val();
    dict.pass= $("#login-password").val();
    $.ajax({
        url:'/loginAdmin',
        type:'POST',
        dataType:'json',
        contentType:'application/json;charset=utf8',
        data:JSON.stringify(dict),
        success: function(data){
                if(data.success){
                    window.location.href='/';
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
        },
        error: function(data){
            swal({
                type:'info',
                title:'Problemas de Red',
                text:"Existen problemas en el servidor, por favor vuelva a intentarlos mas tarde"
            });
        }
    });
});
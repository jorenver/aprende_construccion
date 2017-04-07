$("#passwordsNoMatchRegister").hide();
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
                    $("#passwordsNoMatchRegister").show();
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
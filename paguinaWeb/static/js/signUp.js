var Userinformationdict = {}
var flagError = 0;
Userinformationdict.cedula = $("#signup-cedula").val();
Userinformationdict.nombre = $("#signup-nombre").val();
Userinformationdict.apellido = $("#signup-apellido").val();
Userinformationdict.email = $("#signup-email").val();
Userinformationdict.password = $("#signup-password").val();
Userinformationdict.telefono = $("#signup-telefono").val();
Userinformationdict.direccion = $("#signup-direccion").val();
Userinformationdict.ciudad = $("#signup-ciudad").val();
Userinformationdict.provincia = $("#signup-provincia").val();
Userinformationdict.distrito = $("#signup-distrito").val();
if (!flagError) {
  $("#passwordsIncorrectas").hide();    
}
else{
    $("#passwordsIncorrectas").show();

}



$("#idSignUp").click(
    function(){
        if ($("#signup-password").val() != $("#signup-re-password").val()) {
          $("#passwordsIncorrectas").show();
          flagError = 1;  
        }
        else{
             $.ajax({
            type:"POST",
            url:"/signUpUser",
            data:Userinformationdict
        });
    }
  }
);
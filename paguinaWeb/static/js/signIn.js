var dictUser = {};
dictUser.cedula = $('#login-cedula').val();
dictUser.password = $('#login-password').val();

$("#passwordsNoMatchRegister").hide();

$("#btnSignIn").click(function(){
        $.ajax({
                type:"POST",
                url : "/signInUser",
                data:dictUser,
                success : function(result){
                    console.log(result);
                } 
        });
        $.post("/signInUser",function(data){
             if (!data.truly_signIn) {
                   $("#passwordsNoMatchRegister").show(); 
             }
          

        });
    }
);


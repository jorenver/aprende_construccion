$(document).ready(function(){
                    $("#tableEstudiantes").DataTable();
                    //$('select').select2();
});

function cargarNota(data){
    console.log(data);
	window.location.href="/getNotasEstudiante?id="+data;

}



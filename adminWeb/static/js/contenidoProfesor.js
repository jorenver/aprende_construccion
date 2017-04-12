$(document).ready(function(){

    $(".btnExamenesCapitulo").on('click',function(event){
        window.location.href = '/evaluaciones?id='+event.target.dataset.id;
    });
});

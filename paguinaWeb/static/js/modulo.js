var boton=null;

function procesarContenidoCapitulo(json){
	$('.botonSelected').removeClass("botonSelected");
	boton.className="botonSelected";
    console.log(json);
    if(!json.error){
    	titulo_capitulo.innerHTML= "Capitulo "+json.indice+" : "+json.titulo;
    	var secciones= json.secciones;
    	contenido_secciones.innerHTML="";
    	for (var i = 0; i < secciones.length; i++) {
    		var seccion=secciones[i];
			div_seccion=document.createElement("div");
			div_seccion.setAttribute("class","seccion");


			div_cabecera_seccion=document.createElement("div");
			div_cabecera_seccion.setAttribute("class","row");
			titulo_seccion=document.createElement("h4");
			titulo_seccion.innerHTML="Seccion "+seccion.indice+" : "+seccion.titulo;
			div_cabecera_seccion.appendChild(titulo_seccion);
			div_seccion.appendChild(div_cabecera_seccion);

			var contenidos=seccion.contenidos;
			for (var j = 0; j < contenidos.length; j++) {
				
				var contenido=contenidos[j];
				div_contenido=document.createElement("div");
				div_contenido.setAttribute("class","row");
				div_texto=document.createElement("p");
				div_texto.innerHTML=contenido.texto;
				div_contenido.appendChild(div_texto);
				if(contenido.multimedia){
					div_multimedia=document.createElement("div");
					if(contenido.multimedia.tipo=="foto"){
						div_img=document.createElement("img");
						div_img.setAttribute("src",contenido.multimedia.ruta);
						div_multimedia.appendChild(div_img);
					}
					if(contenido.multimedia.tipo=="video"){
						div_multimedia.setAttribute("class","videcoo-responsive");
						div_iframe=div_img=document.createElement("iframe");
						div_iframe.setAttribute("src",contenido.multimedia.ruta);
						div_multimedia.appendChild(div_iframe);
						
					}
					div_contenido.appendChild(div_multimedia);
				}
				div_seccion.appendChild(div_contenido);

			};
			
			contenido_secciones.appendChild(div_seccion);
		}

    }	
}

function getContenidoCapitulo(event){
	boton= event.target;
	idcapitulo = boton.dataset.idcapitulo;
	var url = "/getContenidoCapitulo?idcapitulo=" + idcapitulo;
    $.ajax({
        dataType: "json",
        url: url,
        data: null,
        success: procesarContenidoCapitulo,
        error:function() {
            alert("Error");
        }
    });

}


//function inicializar(){}

//window.addEventListener('load', inicializar, false);
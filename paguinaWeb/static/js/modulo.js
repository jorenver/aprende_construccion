var boton=null;

function procesarContenidoCapitulo(json){
	$('.botonSelected').removeClass("botonSelected");
	boton.className="botonSelected";
    console.log(json);
    if(!json.error){
    	//titulo_capitulo.innerHTML= "Capitulo "+json.indice+" : "+json.titulo;
    	var secciones= json.secciones;
    	contenido_secciones.innerHTML="";
    	for (var i = 0; i < secciones.length; i++) {
    		var seccion=secciones[i];
			div_seccion=document.createElement("div");
			div_seccion.setAttribute("class","seccion");


			div_cabecera_seccion=document.createElement("div");
			div_cabecera_seccion.setAttribute("class","row");
			titulo_seccion=document.createElement("h4");
			//titulo_seccion.innerHTML="Seccion "+seccion.indice+" : "+seccion.titulo;
			titulo_seccion.innerHTML=seccion.titulo;
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
						div_figure=document.createElement("figure");
						div_figure.setAttribute("class","col-md-10 col-md-offset-1");
						div_continer_img=document.createElement("div");
						div_continer_img.setAttribute("class","multimedia-center");
						div_img=document.createElement("img");
						div_img.setAttribute("src",contenido.multimedia.ruta);
						div_continer_img.appendChild(div_img);
						div_figure.appendChild(div_continer_img);
						if(contenido.multimedia.descripcion){
							div_descripcion=document.createElement("figcaption");
							div_descripcion.setAttribute("class","figure-caption");
							div_descripcion.innerHTML=contenido.multimedia.descripcion;
							div_figure.appendChild(div_descripcion);
						}
						if(contenido.multimedia.fuente){
							div_fuente=document.createElement("figcaption");
							div_fuente.setAttribute("class","figure-caption");
							div_fuente.innerHTML="Fuente: "+contenido.multimedia.fuente;
							div_figure.appendChild(div_fuente);
						}
						div_multimedia.appendChild(div_figure);
					}
					if(contenido.multimedia.tipo=="video"){
						div_multimedia.setAttribute("class","col-md-10 col-md-offset-1");
						div_contenedor_video=document.createElement("div");
						div_contenedor_video.setAttribute("class","multimedia-center video-responsive");
						div_iframe=div_img=document.createElement("iframe");
						div_iframe.setAttribute("src",contenido.multimedia.ruta);
						div_contenedor_video.appendChild(div_iframe);
						div_multimedia.appendChild(div_contenedor_video);
						if(contenido.multimedia.descripcion){
							div_descripcion=document.createElement("figcaption");
							div_descripcion.setAttribute("class","figure-caption");
							div_descripcion.innerHTML=contenido.multimedia.descripcion;
							div_multimedia.appendChild(div_descripcion);
						}
						if(contenido.multimedia.fuente){
							div_fuente=document.createElement("figcaption");
							div_fuente.setAttribute("class","figure-caption");
							div_fuente.innerHTML="Fuente: "+contenido.multimedia.fuente;
							div_multimedia.appendChild(div_fuente);
						}
						
					}
					div_contenido.appendChild(div_multimedia);
				}
				div_seccion.appendChild(div_contenido);

			};
			
			contenido_secciones.appendChild(div_seccion);
		}
		$("#contenedor_boton_evaluacion").show();
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


function inicializar(){
	$("#contenedor_boton_evaluacion").hide();
}

window.addEventListener('load', inicializar, false);
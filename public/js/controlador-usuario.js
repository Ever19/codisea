

//------------------Obtener carpeta del usuario ACTIVA---------------------
function obtenerCarpeta(informacion){
     document.getElementById('carpetas').innerHTML = '';
     document.getElementById('archivos').innerHTML = '';
     for(var i=0; i<informacion[0].carpetass.length;i++){
        document.getElementById('carpetas').innerHTML += 
                 `<div class="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3" id="${informacion[0].carpetass[i]._id}" >
                     <div>
                     <span style=" color:rgb(212, 188, 77)"><a href="#" onclick="seleccionarCarpeta('${informacion[0].carpetass[i]._id}');"><i class="fas fa-folder fa-5x" style=" color:rgb(212, 188, 77)"></i></a><br><span style="color:black">${informacion[0].carpetass[i].nombre}</span><br><span><i class="fas fa-pencil-alt" style="color:Gray"></i></span>&nbsp|&nbsp<span><a href="" onclick="eliminarcarpeta(event, '${informacion[0].carpetass[i]._id}')"><i class="fas fa-trash-alt" style=" color:red"></i></a></span> </span> 
                     </div>
                    
                                      
             </div>`;
    }
 }



//--------------Cargar el DOM----------------

$(document).ready(function(){
	console.log("El DOM ha sido cargado de obtener usuario con carpetas y archivos");
    document.getElementById('carpetas').innerHTML = '';
    document.getElementById('archivos').innerHTML = '';
$.ajax({
	url:"/obtener-session-codigo/:id/carpetass",
	method:"GET",
	dataType:"json",
	success:function(respuesta){
        console.log("RESPUESTA USUARIO ACTIVA: "+respuesta[0].nombre +"  Codigo: " +respuesta[0]._id)
        console.log(respuesta);
        //----------------Mostrar carpetas del seleccion compartir en usuario ACTIVA---------------
        for (var i=0;i<respuesta.length;i++){
            for (var ii=0;ii<respuesta[i].carpetass.length;ii++){

            $("#carpe").append(`<option value="${respuesta[i].carpetass[ii]._id}">${respuesta[i].carpetass[ii].nombre}</option>`);
            $("#carpe").val(null);
        }}

        $("#prueba").append(
			`<input class="form-control" type="hidden" placeholder="Usuario" value="${respuesta[0]._id}" id="valor-usuario">`
        ); 
        console.log("Usuario seleccionado: " + $("#valor-usuario").val());
        obtenerCarpeta(respuesta);  
		},
	error:function(error){
		console.error(error);
	}
});


//----------------Para mostrar usuario del seleccion en compartir------------
$.ajax({
	url:"/usuarios",
	method:"GET",
	dataType:"json",
	success:function(respuesta){
         for (var i=0;i<respuesta.length;i++){
            $("#usuario").append(`<option value="${respuesta[i]._id}">${respuesta[i].nombre}</option>`);
            $("#usuario").val(null);
         }
		},
	error:function(error){
		console.error(error);
	}
});
});





/* //----------Funcion para eliminar carpeta del usuario-----------------
function eliminarcarpeta(e,id){
    e.preventDefault();
    console.log('Codigo eliminado: ' + id );
    $.ajax({
        url:"/obtener-session-codigo/"+id,
        method:"delete",
        dataType:"json",
        success:function(res){
            console.log(res);
            if (res.n==1 && res.ok == 1)
                $("#"+id).remove();
        },
        error:function(error){
            console.log(error);
        }
    });
}  */
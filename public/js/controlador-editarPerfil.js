


//--------------------Mostrar Usuario en editar perfil-----------------

$(document).ready(function(){
    
	console.log("El DOM ha sido cargado de obtener usuario para perfil");
    $.ajax({
	url:"/obtener-session-codigo/:id/carpetass",
	method:"GET",
	dataType:"json",
	success:function(respuesta){
        console.log("RESPUESTA USUARIO ACTIVA: "+respuesta[0].nombre +"  Codigo: " +respuesta[0]._id)
        console.log(respuesta);
        $("#prueba5").append(
            `<input class="form-control" type="hidden" placeholder="Usuario" value="${respuesta[0]._id}" id="valor-usuarioPerfil">`
        );
       

        $("#formularioperfil").append(`<input type="text" class="form-control mt-3" value="${respuesta[0].nombre}" name="nombre" id="nombre" placeholder="Nombre" DISABLED>
        <input type="text" class="form-control mt-3" value="${respuesta[0].apellido}" name="apellido" id="apellido" placeholder="Apellido" DISABLED>
        <input type="text" class="form-control mt-3" value="${respuesta[0].usuario}" name="usuario" id="usuario" placeholder="Usuario" DISABLED>
        <input type="text" class="form-control mt-3" value="${respuesta[0].correo}" name="correo" id="correo" placeholder="Correo electrónico" DISABLED>
        <input type="password" class="form-control mt-3" value="${respuesta[0].contrasena}" name="contrasena" id="contrasena" placeholder="Contraseña" DISABLED>
        `);

 
       
		},
	error:function(error){
		console.error(error);
	}
});
});




//--------------------Mostrar y habilitar los inputs Usuario en editar perfil-----------------

$("#btn_editar").click(function (){
    
	console.log("El DOM ha sido cargado para habilitar usuario de perfil");
    $.ajax({
	url:"/obtener-session-codigo/:id/carpetass",
	method:"GET",
	dataType:"json",
	success:function(respuesta){
        console.log("RESPUESTA USUARIO ACTIVA: "+respuesta[0].nombre +"  Codigo: " +respuesta[0]._id)
        console.log(respuesta);
                      
		},
	error:function(error){
		console.error(error);
	}
});
});



//------------------Para Actualizar usuario de perfil-------------------
$("#btn_actualizar").click(function (){
    var parametros5 =$("#formularioperfilmodal").serialize();
    console.log(parametros5);
  
    $.ajax({
        url:`/obtener-session-codigo-perfil/${$("#valor-usuarioPerfil").val()}`,
        method:"put",
        data: parametros5,  
        dataType: "json",
        success:function(res){
            console.log(res);
            $("#modalAgregarPerfil").modal("hide");

        },
            error:function(error){
            console.log(error);
            $("#modalAgregarPerfil").modal("hide");
       }
    });location.reload();
     
});

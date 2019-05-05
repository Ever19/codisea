

//------------------Obtener carpeta del usuario ACTIVA---------------------
function obtenerCarpeta(informacion){
     document.getElementById('carpetas').innerHTML = '';
     document.getElementById('archivos').innerHTML = '';
     for(var i=0; i<informacion[0].carpetass.length;i++){
        document.getElementById('carpetas').innerHTML += 
                 `<div class="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3" id="${informacion[0].carpetass[i]._id}" >
                     <div>
                     <span style=" color:rgb(212, 188, 77)"><a href="#" onclick="seleccionarCarpeta('${informacion[0].carpetass[i]._id}');"><i class="fas fa-folder fa-5x" style=" color:rgb(212, 188, 77)"></i></a><br><span style="color:black">${informacion[0].carpetass[i].nombre}</span><br><span><a href="#" onclick="editarcarpeta('${informacion[0].carpetass[i]._id}')" data-toggle="modal"  data-target="#modalEditarCarpeta"><i class="fas fa-pencil-alt" style="color:Gray"></i></a></span>&nbsp|&nbsp<span><a href="" onclick="eliminarcarpeta(event, '${informacion[0].carpetass[i]._id}')"><i class="fas fa-trash-alt" style=" color:red"></i></a></span> </span> 
                     </div>
                    
                                      
             </div>`;
    }
 }



 //------------------No Obtener carpeta del usuario ACTIVA---------------------
function noObtenerCarpeta(){
    document.getElementById('carpetas').innerHTML = '';
    document.getElementById('archivos').innerHTML = '';
    document.getElementById("botonnuevacarpeta").style.enabled = false;
    
   
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

        $("#formulario-nabvar").append(`<a href="editarPerfil.html"> <button class="btn btn-outline-primary my-2 my-sm-0" type="button" style="border-radius: 1.55rem;" 
        id="btn_editarperfil">${respuesta[0].nombre}</button></a>`);

        $("#formulario-nabvar").append(`<a href="#"> <button class="btn btn-outline-primary my-2 my-sm-0" type="button" style="border-radius: 1.55rem;" 
        id="btn_editarperfil">${respuesta[0].tipoUsuario.plan}</button></a>`);

        $("#prueba").append(
			`<input class="form-control" type="hidden" placeholder="Usuario" value="${respuesta[0]._id}" id="valor-usuario">`
        ); 

        $("#prueba7").append(
            `<input class="form-control" type="hidden" placeholder="Usuario" value="${respuesta[0]._id}" id="valor-usuarioPlan">`
        );
        console.log("Usuario seleccionado: " + $("#valor-usuario").val());

        //console.log(respuesta[0].tipoUsuario.plan.length);

        if(respuesta[0].tipoUsuario.plan=="Sordos/Hipoacusias"){
            obtenerCarpeta(respuesta);
        }

        if(respuesta[0].tipoUsuario.plan=="Plan-1(No incluye carpetas y archivos)"){
            noObtenerCarpeta();
        }

        if(respuesta[0].tipoUsuario.plan=="Plan-2(Incluye carpetas y archivos)"){
            obtenerCarpeta(respuesta);
        }
          
          
            
        
        

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
            $("#usuario").append(`<option value="${respuesta[i]._id}">${respuesta[i].usuario}</option>`);
            $("#usuario").val(null);
         }
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

//----------Funcion para editar el nombre de carpeta-----------------
function editarcarpeta(id){
    $("#prueba6").append(
        `<input class="form-control" type="hidden" placeholder="Usuario" value="${id}" id="valorcarpetaeditar">`
    );
    console.log(id);
} 


//------------------Para editar nombre de carpeta-------------------
$("#btn-editar-carpeta").click(function (){
    var parametros6 =$("#formularioeditarcarpeta").serialize();
    console.log(parametros6);
    $.ajax({
        url:`/carpetaeditar/${$("#valorcarpetaeditar").val()}`,
        method:"put",
        data: parametros6,
        dataType:"json",
        success:function(res){
            console.log(res);
            $("#modalEditarCarpeta").modal("hide");
        },
        error:function(error){
            console.log(error);
            $("#modalEditarCarpeta").modal("hide");
        }
    }); location.reload();
     
});
 
//------------------Para Actualizar plan de usuario-------------------
$("#btn-guardar-plan").click(function (){
    var parametros5 =$("#formularioplan").serialize()+"&plan="+$("#codigoplan option:selected").text();;
    console.log(parametros5);
  
    $.ajax({
        url:`/obtener-session-codigo-plan/${$("#valor-usuarioPlan").val()}`,
        method:"put",
        data: parametros5,  
        dataType: "json",
        success:function(res){
            console.log(res);
            $("#modalActualizarPlan").modal("hide");

        },
            error:function(error){
            console.log(error);
            $("#modalActualizarPlan").modal("hide");
       }
    });location.reload();
     
});

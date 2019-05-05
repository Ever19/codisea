
//---------------Para obtener archivos con  categoria-------------
function generarItemsarchivos(informacionarchivos){
    for(var i=0; i<informacionarchivos.length;i++){
            document.getElementById(informacionarchivos[i].categoria._id).innerHTML += 
                `<div class="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3" id="${informacionarchivos[i]._id}">
                    <div>
                    <span style=" color:rgb(212, 188, 77)"><i class="fab fa-css3-alt fa-5x" style="color:cornflowerblue"></i><br><span style="color:black">${informacionarchivos[i].nombre}</span><br><span><a href="" onclick="eliminararchivo(event, '1')"><i class="fas fa-pencil-alt" style="color:Gray"></a></i></span>&nbsp|&nbsp<span><a href="" onclick="eliminararchivo(event, '${informacionarchivos[i]._id}')"><i class="fas fa-trash-alt" style=" color:red"></i></a></span> </span> 
                    </div>
                    
                                      
            </div>`;

            
    }
}


//---------------Cargar DOM de archivos-------------
$(document).ready(function(){
    console.log("El DOM ha sido cargado de controlador Archivo");
    $.ajax({
        url:"/categorias",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log("Respuesta de Extensiones");
            console.log(res);
            for (var i=0; i<res.length; i++){
                $("#archivos").append(
                    `<div class="col-12">
                        <p></p>
                        <h4>${res[i].nombre}</h4>
                        
                        <div class="row" id="${res[i]._id}">
                        
                    </div>`
                );
                $("#categoria").append(
                    `
                    <option value="${res[i]._id}">${res[i].nombre}</option>
                    `
                );
            }
            //obtenerArchivos();
        },
        error:function(error){
            console.log(error);
        }
    });
});

//----------Obtener Archivos --------------
function obtenerArchivos(){
    $.ajax({
        url:"/archivos",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log("Respuesta Archivos");
            console.log(res);
            generarItemsarchivos(res);
        },
        error:function(error){
            console.log(error);
        }
    });
}


//----------------Para eliminar archivo---------------
function eliminararchivo(e,id){
    e.preventDefault();
    console.log('Eliminar el objeto: ' + id);
    $.ajax({
        url:"/archivos/"+id,
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
    });//location.reload();
} 
 


//--------------Para guardar nuevo archivo-------------------

$("#btn-guardar-archivo").click(function(){
    var parametros = $("#formularioarchivo").serialize() + "&nombreCategoria="+$("#categoria option:selected").text();
    console.log("Información a guardar: " + parametros);
    $.ajax({
        url:"/archivos/",
        method:"post",
        data: parametros,
        dataType: "json",
        success:function(res){
            console.log(res);
            $("#prueba3").append(
                `<input class="form-control" type="hidden" placeholder="Usuario" value="${res._id}" id="valor-archivo">`
            );
            $("#modalAgregarArchivo").modal("hide");
            
            //Anexar el archivo guardada
            $("#"+res.categoria._id).append( 
                `<div class="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3" id="${res._id}">
                    <div>
                    <span style=" color:rgb(212, 188, 77)"><i class="fab fa-css3-alt fa-5x" style="color:cornflowerblue"></i><br><span style="color:black">${res.nombre}</span><br><span><i class="fas fa-pencil-alt" style="color:Gray"></i></span>&nbsp|&nbsp<span><a href="" onclick="eliminararchivo(event, '${res._id}')"><i class="fas fa-trash-alt" style=" color:red"></i></a></span></span> 
                    </div>
                    
                                      
            </div>`);
            cargararchivoarchivo();
        },
        error:function(error){
            console.log(error);
            $("#modalAgregarArchivo").modal("hide");
        }
    });
}); 
 


//------------------Para cargar archivo nuevo-------------------
function cargararchivoarchivo(){
    var parametros2 = "archi="+$("#valor-archivo").val();
    console.log(parametros2);
    $.ajax({
        url:`/carpetas/${$("#seleccionar-carpeta").val()}`,
        method:"put",
        data: "archi="+$("#valor-archivo").val(),  
        dataType: "json",
        success:function(res){
            console.log(res);
            console.log($("#seleccionar-carpeta").val());
            console.log($("#valor-archivo").val());         
            $("#modalAgregarCarpeta").modal("hide");                      
        },
            error:function(error){
            console.log(error);
            $("#modalAgregarCarpeta").modal("hide");
        }
    });location.reload();
     
};
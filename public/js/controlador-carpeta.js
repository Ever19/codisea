//--------------------Funcion para obtener carpeta---------------
function obtenerCarpetas(informacion){
    
    document.getElementById('carpetas').innerHTML = '';
    for(var i=0; i<informacion.length;i++){
 
        document.getElementById('carpetas').innerHTML += 
                `<div class="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3" id="${informacion[i]._id}" >
                    <div>
                    <span style=" color:rgb(212, 188, 77)"><a href="#" onclick="seleccionarCarpeta('${informacion[i]._id}');"><i class="fas fa-folder fa-5x" style=" color:rgb(212, 188, 77)"></i></a><br><span style="color:black">${informacion[i].nombre}</span><br><span><a href="#" onclick="editarcarpeta('${informacion[i]._id}')" data-toggle="modal"  data-target="#modalEditarCarpeta"><i class="fas fa-pencil-alt" style="color:Gray"></i></a></span>&nbsp|&nbsp<span><a href="" onclick="eliminarcarpeta(event, '${informacion[i]._id}')"><i class="fas fa-trash-alt" style=" color:red"></i></a></span> </span> 
                    </div>
                 </div>`;
    }
}




//------------------Para seleccionar carpeta----------------------
function seleccionarCarpeta(codigoCarpeta){
    console.log("Seleccionar carpeta: " + codigoCarpeta);
    document.getElementById('carpetas').innerHTML = '';
    document.getElementById('archivos').innerHTML = '';
    $("#prueba4").html("");
    $("#prueba4").append(
        `<input class="form-control" type="hidden" placeholder="Usuario" value="${codigoCarpeta}" id="seleccionar-carpeta">`
    );
    
    //-------Para subcarpetas---------
    $.ajax({
        url:`/carpetas/${codigoCarpeta}/subcarpetas`, 
       dataType:"json",
        success:function(res){
            console.log(res);
            for(var i=0;i<res.length;i++){
                for(var ii=0;ii<res[i].subcarpetas.length;ii++){
                $("#carpetas").append(
                    `<div class="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3" id="${res[i].subcarpetas[ii]._id}" >
                    <div>
                    <span style=" color:rgb(212, 188, 77)"><a href="#" onclick="seleccionarCarpeta('${res[i].subcarpetas[ii]._id}');"><i class="fas fa-folder fa-5x" style=" color:rgb(212, 188, 77)"></i></a><br><span style="color:black">${res[i].subcarpetas[ii].nombre}</span><br><span><i class="fas fa-pencil-alt" style="color:Gray"></i></span>&nbsp|&nbsp<span><a href="" onclick="eliminarcarpeta(event, '${res[i].subcarpetas[ii]._id}')"><i class="fas fa-trash-alt" style=" color:red"></i></a></span> </span> 
                    </div>
                 </div>`
                );
            }}
        },
        error:function(error){
            console.error(error);
        }
    });

    //-------Para archivos---------
    $.ajax({
        url:`/carpetas/${codigoCarpeta}/archivos`, 
       dataType:"json",
        success:function(res){
            console.log(res);
            
            for(var i=0;i<res.length;i++){
                for(var ii=0;ii<res[i].archivos.length;ii++){
                    //------Para extension HTML----------------
                    if(res[i].archivos[ii].categoria.nombre == "HTML5"){
                     $("#archivos").append(
                        `<div class="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3" id="${res[i].archivos[ii]._id}">
                        <div>
                        <span style=" color:rgb(212, 188, 77)"><a href="#" onclick="seleccionarArchivo('1');"><i class="fab fa-html5 fa-5x" style="color:rgb(231, 113, 44)"></i></a><br><span style="color:black">${res[i].archivos[ii].nombre}</span><br><span><i class="fas fa-pencil-alt" style="color:Gray"></i></span>&nbsp|&nbsp<span><a href="" onclick="eliminararchivo(event, '${res[i].archivos[ii]._id}')"><i class="fas fa-trash-alt" style=" color:red"></i></a></span> </span> 
                        </div>
                        </div>`
                );}
                    //------Para extension CSS3----------------
                    if(res[i].archivos[ii].categoria.nombre == "CSS3"){
                        $("#archivos").append(
                           `<div class="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3" id="${res[i].archivos[ii]._id}">
                           <div>
                           <span style=" color:rgb(212, 188, 77)"><a href="#" onclick="seleccionarArchivo('1');"><i class="fab fa-css3-alt fa-5x" style="color:cornflowerblue"></i></a><br><span style="color:black">${res[i].archivos[ii].nombre}</span><br><span><i class="fas fa-pencil-alt" style="color:Gray"></i></span>&nbsp|&nbsp<span><a href="" onclick="eliminararchivo(event, '${res[i].archivos[ii]._id}')"><i class="fas fa-trash-alt" style=" color:red"></i></a></span> </span> 
                           </div>
                           </div>`
                   );}
                   //------Para extension JS-------------------
                   if(res[i].archivos[ii].categoria.nombre == "JS"){
                    $("#archivos").append(
                       `<div class="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3" id="${res[i].archivos[ii]._id}">
                       <div>
                       <span style=" color:rgb(212, 188, 77)"><a href="#" onclick="seleccionarArchivo('1');"><i class="fab fa-js fa-5x" style="color:rgb(235, 235, 80)"></i></a><br><span style="color:black">${res[i].archivos[ii].nombre}</span><br><span><i class="fas fa-pencil-alt" style="color:Gray"></i></span>&nbsp|&nbsp<span><a href="" onclick="eliminararchivo(event, '${res[i].archivos[ii]._id}')"><i class="fas fa-trash-alt" style=" color:red"></i></a></span> </span> 
                       </div>
                       </div>`
               );}
            }}
        },
        error:function(error){
            console.error(error);
        }
    });
}





//---------------------------Cargar el DOM-------------------------------

$(document).ready(function(){
    console.log("El DOM ha sido cargado de controlador carpeta");
    $.ajax({
        url:"/carpetas",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log("Respuesta de Carpetas");
            console.log(res);
            obtenerCarpetas(res);
            
        },
        error:function(error){
            console.log(error);
        }
    });

});




//---------------Para guardar carpeta nueva----------------
$("#btn-guardar-carpeta").click(function (){
    var parametros = $("#formulariocarpeta").serialize();
    console.log("Información a guardar carpeta: " + parametros);
    $.ajax({
        url:"/carpetas/",
        method:"post",
        data: parametros,
        dataType: "json",
        success:function(res){
            console.log(res);
            console.log(res._id);
            $("#prueba2").append(
                `<input class="form-control" type="hidden" placeholder="Usuario" value="${res._id}" id="valor-carpeta">`
            );
           
            $("#modalAgregarCarpeta").modal("hide");
            cargarcarpetacarpeta();

            },
        
        error:function(error){
            console.log(error);
            $("#modalAgregarCarpeta").modal("hide");
        }
    });
    
});





//------------------Para cargar carpeta nueva-------------------
function cargarcarpetacarpeta(){
    var parametros2 = "carpe="+$("#valor-carpeta").val();
    console.log(parametros2);
    $.ajax({
        url:`/obtener-session-codigo/${$("#valor-usuario").val()}`,
        method:"put",
        data: "carpe="+$("#valor-carpeta").val(),  
        dataType: "json",
        success:function(res){
            console.log(res);
            console.log($("#valor-usuario").val());
            console.log($("#valor-carpeta").val());         
            $("#modalAgregarCarpeta").modal("hide");                      
        },
            error:function(error){
            console.log(error);
            $("#modalAgregarCarpeta").modal("hide");
        }
    });location.reload();
     
};





//----------Funcion para eliminar carpeta-----------------
function eliminarcarpeta(e,id){
    e.preventDefault();
    console.log('Codigo eliminado: ' + id );
    $.ajax({
        url:"/carpetas/"+id,
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
} 


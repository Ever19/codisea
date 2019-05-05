

//---------------Cargar DOM de archivos-------------
$(document).ready(function(){
    console.log("El DOM ha sido cargado de controlador planes");
    $.ajax({
        url:"/planes",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log("Respuesta de planes");
            console.log(res);
            for (var i=0; i<res.length; i++){
              
                $("#tipoUsuario").append(
                    `
                    <option value="${res[i]._id}">${res[i].plan}</option>
                    `
                );
                
                $("#codigoplan").append(
                    `
                    <option value="${res[i]._id}">${res[i].plan}</option>
                    `
                );
            }

        },
        error:function(error){
            console.log(error);
        }
    });
});

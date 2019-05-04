//------------------Boton para enviar carpeta al usuario compartido-------------------
$("#btn-guardar-compartir").click(function (){
    var parametros4 = "carpe="+$("#carpe").val()+"&usuario="+$("#usuario").val();
	console.log(parametros4);
     $.ajax({
        url:`/usuarios/${$("#usuario").val()}`,
        method:"put",
        data: "carpe="+$("#carpe").val(),  
        dataType: "json",
        success:function(res){
			console.log(res);
			alert("Ha compartido exitosamente");
            console.log($("#usuario").val());
            console.log($("#carpe").val());         
            $("#modalAgregarCompartir").modal("hide");                      
        },
            error:function(error){
            console.log(error);
            $("#modalAgregarCompartir").modal("hide");
        }
    });
     
});
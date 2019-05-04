//---------------Ingresar home el usuario en login--------------- 
$("#btn_sesion").click(function(){
    console.log($("#form-login").serialize());
    $.ajax({
        url:"/login",
        method:"POST",
        data:$("#form-login").serialize(),
        dataType:"json",
        success:function(res){
            console.log(res);
            console.log(res.status);
            if (res.status == 1)
            
                window.location.href = "/home.html";
            else 
                alert(res.mensaje);
        },
        error:function(error){
            console.error(error);
        }
    });
});


//-----------------Guardar nuevo usuario o registra nuevo----------
$("#btn_registrar").click(function(){
    var parametros3 = $("#formulario-registro").serialize();
    console.log("Información a guardar usuario: " + parametros3);
    $.ajax({
        url:"/usuarios",
        method:"post",
        data: parametros3,
        dataType: "json",
        success:function(res3){
            console.log(res3);
                      
        },
        error:function(error){
            console.log(error);
            
        }
    });alert("Guardado registro éxito");
});
 
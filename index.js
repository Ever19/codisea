var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var database = require("./modules/database");
var carpetasRouter = require('./routers/carpetas-router');
var categoriasRouter = require('./routers/categorias-router');
var archivosRouter = require('./routers/archivos-router');
var usuariosRouter = require('./routers/usuarios-router');
var usuario = require("./models/usuario");
var carpeta = require("./models/carpeta");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/carpetas",carpetasRouter);
app.use("/categorias",categoriasRouter);
app.use("/archivos",archivosRouter);
app.use("/usuarios",usuariosRouter);
app.use(express.static("public"));
app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));


//-----------------POST para Login----------------
app.post("/login",function(req, res){

    usuario.find({usuario:req.body.usuario, contrasena:req.body.contrasena})
    .then(data=>{
        if (data.length==1){
            req.session.codigoUsuario = data[0]._id;
            req.session.correoUsuario =  data[0].correo;
            req.session.codigoTipoUsuario = data[0].tipoUsuario;
            res.send({status:1,mensaje:"Usuario autenticado con éxito", usuario:data[0]});
        }else{
            res.send({status:0,mensaje:"Usuario o Contraseña incorrectas"});        
            
        }
        
    })
    .catch(error=>{
        res.send(error);
    }); 
});


//------------Para salir sesion-----------
app.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect("/");
});


//-----------Obtener los usuarios----------
app.get("/obtener-session-codigo",function(req,res){
    usuario.find({_id:req.session.codigoUsuario}).then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
}); 

//-----------Obtener los usuarios para perfil----------
app.get("/obtener-session-codigo-perfil",function(req,res){
    usuario.find({_id:req.session.codigoUsuario}).then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
}); 


//------------Obtener USUARIO ACTIVA------------
app.get("/obtener-session-codigo/:id",function(req,res){
    usuario.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});


//------------Obtener USUARIO ACTIVA para perfil------------
app.get("/obtener-session-codigo-perfil/:id",function(req,res){
    usuario.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});




//-----------Obtener carpetas dentro Usuario ACTIVA------------
app.get("/obtener-session-codigo/:id/carpetass",function(req,res){
    usuario.aggregate([
        {
            $lookup:{
                from:"carpetas",
                localField:"carpetass", 
                foreignField:"_id",
                as:"carpetass"
            }
        },
        {
            $match:{
                _id:mongoose.Types.ObjectId(req.session.codigoUsuario)
            }
        },
        
    ])
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});





//--------------Agregar nueva carpeta del Usuario ACTIVA-----------
app.put("/obtener-session-codigo/:id", function(req, res){
    usuario.update(
        {_id:req.params.id},
        {
            $push:{
                carpetass:
                    
                    mongoose.Types.ObjectId(req.body.carpe),
                
                }}).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });
});


//--------------Actualizar del perfil de Usuario ACTIVA-----------
app.put("/obtener-session-codigo-perfil/:id", function(req, res){
    usuario.update(
        {_id:req.params.id},
        {              
             $set:{                     
                
                nombre:req.body.nombre,
                apellido:req.body.apellido,
                usuario:req.body.usuario,
                contrasena:req.body.contrasena,
                correo:req.body.correo
                //tipoUsuario:req.body.tipoUsuario,
               
                
                }}).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });
});

    

//-----------peticion restringida, se envia una funcion midleware-----------
app.get("/peticion-registringido",verificarAutenticacion,function(req, res){
    res.send("Este es un contenido restringido");
    res.end();
});

//-------------Para agregar seguridad a una ruta especifica-----------------
function verificarAutenticacion(req, res, next){
	if(req.session.correoUsuario)
		return next();
	else
		res.send("ERROR, ACCESO NO AUTORIZADO");
}

//////////////////////////////PARA EDITAR CARPETA/////////////////////////

//------------------Obtener los listados de todas las carpetas------------------
app.get("/carpetaeditar/",function(req,res){
    carpeta.find()
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//------------------Obtener una carpeta en particular---------------------------
app.get("/carpetaeditar/:id",function(req,res){
    carpeta.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//--------------Editar nombre de carpeta de Usuario ACTIVA-----------
app.put("/carpetaeditar/:id", function(req, res){
    carpeta.update(
        {_id:req.params.id},
        {              
             $set:{                 
                nombre:req.body.nombre
             }}).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });
});



///////////////////////////////////////////////////////////////////

app.listen(3333, function(){
    console.log("Servidor levantado 3333");
});
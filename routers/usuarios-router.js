var express = require("express");
var router = express.Router();
var usuario = require("../models/usuario");
var mongoose = require("mongoose");



//------------Obtener listado USUARIOS----------
router.get("/",function(req,res){
    usuario.find()
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//-----------Obtener listado un solo usuario-------
router.get("/:id",function(req,res){
    usuario.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});


//-----------Peticion para guardar un registro de usuario---------------
router.post("/", function(req, res){
    var p = new usuario({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            usuario: req.body.usuario,
            correo: req.body.correo,
            contrasena: req.body.contrasena,
            tipoUsuario: req.body.tipoUsuario            
           
    });

    console.log(JSON.stringify({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        usuario: req.body.usuario,
        correo: req.body.correo,
        contrasena: req.body.contrasena,
        tipoUsuario: req.body.tipoUsuario
        
}));

    p.save()
    .then(obj=>{
        res.send(obj);
    })
    .catch(error=>{
        res.send(obj);
    });

});



//----------Obtener carpetas dentro usuario----------
router.get("/:id/carpetass",function(req,res){
    usuario.aggregate([
        {
            $lookup:{
                from:"usuarios",
                localField:"carpetass", 
                foreignField:"_id",
                as:"carpetass"
            }
        },
        {
            $match:{
                _id:mongoose.Types.ObjectId(req.params.id)

                
            }
        },
        {
            $project:{carpetass:1}
        }
    ])
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});


//--------------Enviar carpeta compartida del Usuario ACTIVA-----------
router.put("/:id", function(req, res){
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


module.exports = router;
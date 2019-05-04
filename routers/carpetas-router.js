var express = require("express");
var router = express.Router();
var carpeta = require("../models/carpeta");
var mongoose=require("mongoose");

//------------------Obtener los listados de todas las carpetas------------------
router.get("/",function(req,res){
    carpeta.find()
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//------------------Obtener una carpeta en particular---------------------------
router.get("/:id",function(req,res){
    carpeta.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//------------------Peticion para guardar una carpeta----------------------------
router.post("/", function(req, res){
    var p = new carpeta({
            nombre: req.body.nombre
           
    });

    console.log(JSON.stringify({
        nombre: req.body.nombre
        
}));

    p.save()
    .then(obj=>{
        res.send(obj);
    })
    .catch(error=>{
        res.send(obj);
    });

});


//----------------para eliminar un registro de carpeta---------------------------
router.delete("/:id",function(req, res){
    carpeta.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});



//------------------Obtener varias Sub carpetas------------------------------------------
router.get("/:id/subcarpetas",function(req,res){
    carpeta.aggregate([
        {
            $lookup:{
                from:"carpetas",
                localField:"subcarpetas", 
                foreignField:"_id",
                as:"subcarpetas"
            }
        },
        {
            $match:{
                _id:mongoose.Types.ObjectId(req.params.id)
            }
        },
        {
            $project:{subcarpetas:1}
        }
        
    ])
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});



//------------------Obtener archivos dentro de carpeta------------------------------------------
router.get("/:id/archivos",function(req,res){
    carpeta.aggregate([
        {
            $lookup:{
                from:"archivos",
                localField:"archivos", 
                foreignField:"_id",
                as:"archivos"
            }
        },
        {
            $match:{
                _id:mongoose.Types.ObjectId(req.params.id)
            }
        },
        {
            $project:{archivos:1}
        }
        
    ])
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});


//------------------Agregar archivos dentro de carpeta------------------------------------------
router.put("/:id", function(req, res){
    carpeta.update(
        {_id:req.params.id},
        {
            $push:{
                archivos: mongoose.Types.ObjectId(req.body.archi),
                
                }}).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });
});



module.exports = router;
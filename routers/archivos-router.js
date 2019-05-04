var express = require("express");
var router = express.Router();
var archivo = require("../models/archivo");
var mongoose = require("mongoose");


//Obtener el listado de todas las peliculas
router.get("/",function(req,res){
    archivo.find()
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Obtener una pelicula en particular
router.get("/:id",function(req,res){
    archivo.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Peticion para guardar un archivo
router.post("/", function(req, res){
    var p = new archivo({
            nombre: req.body.nombre,
            categoria: {
                _id:mongoose.Types.ObjectId(req.body.categoria),
                nombre: req.body.nombreCategoria
            }
           
    });

    console.log(JSON.stringify({
        nombre: req.body.nombre,
        categoria: {
            _id: mongoose.Types.ObjectId(req.body.categoria),
            nombre: req.body.nombreCategoria
        }
        
}));

    p.save()
    .then(obj=>{
        res.send(obj);
    })
    .catch(error=>{
        res.send(obj);
    });

});

//Peticion para actualizar un registro
router.put("/:id",function(req,res){
    archivo.update(
        {_id:req.params.id},
        {
            nombre : req.body.nombre,
            categoria: {
                nombre: req.body.nombreCategoria
            }
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });//El primero son los filtros, el segundo son los campos
});


//Peticion para eliminar un registro
router.delete("/:id",function(req, res){
    archivo.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});


module.exports = router;
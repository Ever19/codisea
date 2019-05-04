var express = require("express");
var router = express.Router();
var categoria = require("../models/categoria");
var mongoose = require("mongoose");


//----------------Obtener el listado de las categorias de archivos--------------
router.get("/",function(req,res){
    categoria.find().sort({orden:1})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});


module.exports = router;
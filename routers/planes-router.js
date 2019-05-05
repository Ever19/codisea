var express = require("express");
var router = express.Router();
var plan = require("../models/plan");
var mongoose = require("mongoose");


//----------------Obtener el listado de las categorias de archivos--------------
router.get("/",function(req,res){
    plan.find().sort({orden:1})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});


module.exports = router;
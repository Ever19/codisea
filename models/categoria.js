var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombre : String,
        orden: Number,
        iconoarchivo: String
        
    }
);
module.exports = mongoose.model('categorias',esquema);

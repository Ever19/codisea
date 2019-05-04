var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombre : String,
        subcarpetas : mongoose.Schema.Types.Mixed,
        archivos: mongoose.Schema.Types.Mixed
        
    }
);

module.exports = mongoose.model('carpetas',esquema);


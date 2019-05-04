var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombre : String,
        categoria : mongoose.Schema.Types.Mixed
    }
);
module.exports = mongoose.model('archivos',esquema);

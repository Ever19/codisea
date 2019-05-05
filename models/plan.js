var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        plan : String,
        orden: Number
        
    }
);
module.exports = mongoose.model('planes',esquema);

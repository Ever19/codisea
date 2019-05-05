var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombre : String,
        apellido : String,
        usuario : String,
        contrasena:String,
        correo:String,
        tipoUsuario:mongoose.Schema.Types.Mixed,
        carpetass: mongoose.Schema.Types.Mixed
    }
);

module.exports = mongoose.model('usuarios',esquema);
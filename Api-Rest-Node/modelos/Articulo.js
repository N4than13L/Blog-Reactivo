// 1. Hacer la desesctructuracion de Schema y model
const { Schema, model } = require("mongoose");

// 2. Estructura del modelo. con los parametros en si.
const ArticuloSchema = Schema({
  titulo: {
    type: String,
    required: true,
  },
  contenido: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now(),
  },
  imagen: {
    type: String,
    default: "default.png",
  },
});

// 3. exportar el modelo.
module.exports = model("Articulo", ArticuloSchema);
// Con esto se pluraliza en la base de datos de mongoose, es decir (articulos).

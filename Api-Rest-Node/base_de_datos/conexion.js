// 1. se importa mongosse.
const mongoose = require("mongoose");

// 2. se crea la una constante asincrona para la conexio.
const conexion = async () => {
  // 3.creamos un try catch.
  try {
    // 4. creamos la conexion mediante la funcion de connect de mongoose y se la pasa el string de la conexion que resive la funcion ("mongodb://localhost:27017/database"). Seguido de setear el estrict mode de mongoose.
    mongoose.set("strictQuery", false);
    mongoose.connect("mongodb://localhost:27017/mi_blog");
    /* Parametrtos a la hora de que de error.
    , {    
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true 
    } */
    console.log("Conectado con exito a la base de datos mi_blog");
  } catch (error) {
    console.log(error);
    throw new Error("No se ha podido conectar a la base de datos ");
  }
};

// 5. Se exporta la constante.
module.exports = {
  conexion,
};

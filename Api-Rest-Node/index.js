// 1. Se importa la constante conexion, express, CORS
const { conexion } = require("./base_de_datos/conexion");
const express = require("express");
const cors = require("cors");
// 2. Inizializar aplicacion.
console.log("aplicacion funcionando");

// 3. Conectar a la base de datos.
conexion();

// 4. Crear servidor de node.
const app = express();
const puerto = 3900;

// 5. Configurar CORS.
app.use(cors());

// 6. Convertir body a objeto Js.
app.use(express.json());

// 7. Rutas.
// req: request, res: response.
app.get("/probando", (req, res) => {
  console.log("Ejecutandose el endpoint probando");
  return res.status(200).send({ message: "Ejecutandose el endpoint probando" });
});

// rutas de pruebas pulidas.
const rutas_articulo = require("./rutas/articulo_ruta");

// Cargar las rutas.
app.use("/api", rutas_articulo);

// 8. Crear servidor y escuchar peticiones http.
app.listen(puerto, () => {
  console.log("servidor corriento en puerto " + puerto);
});

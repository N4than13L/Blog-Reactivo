// 1. importar el Router para poder hacer las peticiones.
const { Router } = require("express");
const router = Router();

// 2. importar el controlador
const ArticuloControlador = require("../controladores/articuloController");

// 3. Ruta de prueba.
//    peticion / nombre de la ruta/ Controlador / Metodo que controlador.
router.get("/rutadeprueba", ArticuloControlador.prueba);
router.get("/curso", ArticuloControlador.curso);

// Rutas utiles para el API.
router.post("/crear", ArticuloControlador.crear);
router.get("/articulos/:ultimos?", ArticuloControlador.listar);
router.get("/articulo/:id", ArticuloControlador.uno);
router.delete("/articulo/:id", ArticuloControlador.borrar);
router.put("/articulo/:id", ArticuloControlador.editar);

// 4. Exportar el articulo rutes.
module.exports = router;

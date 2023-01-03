// 1. importar el Router para poder hacer las peticiones.
const { Router } = require("express");
const router = Router();

// 2. importar el controlador
const ArticuloControlador = require("../controladores/articuloController");

// 3. Ruta de prueba.
//    peticion / nombre de la ruta/ Controlador / Metodo que controlador.
router.get("/rutadeprueba", ArticuloControlador.prueba);
router.get("/curso", ArticuloControlador.curso);

// 4. Exportar el articulo rutes.
module.exports = router;

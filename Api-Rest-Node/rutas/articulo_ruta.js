// 1. importar el Router para poder hacer las peticiones.
const { Router } = require("express");
const router = Router();
// 1.1 importar multer.
const multer = require("multer");

// 1.2 crear middleware el almacenamiento para guardar las imagenes.
const almacenamiento = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./imagenes/articulo/");
  },
  filename: function (req, file, cb) {
    cb(null, "articulo" + Date.now() + file.originalname);
  },
});

// sacar las subidas para decirle a multer como debe de ejecutarse.
const subidas = multer({ storage: almacenamiento });

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
router.post(
  "/subir-imagen/:id",
  [subidas.single("archivo")],
  ArticuloControlador.subir
);

router.get("/imagen/:fichero", ArticuloControlador.imagen);
router.get("/buscar/:busqueda", ArticuloControlador.busqueda);

// 4. Exportar el articulo rutes.
module.exports = router;

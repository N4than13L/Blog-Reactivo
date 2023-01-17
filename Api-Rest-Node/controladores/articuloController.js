// 1. Importar validator, modelo y helpers.
const Articulo = require("../modelos/Articulo");
const path = require("path");
const { validar_Articulo } = require("../helpers/validarArticulo");
const fs = require("fs");

// 2. Crear metodos de prueba y los metodos correspondietes al API.
const prueba = (req, res) => {
  return res.status(200).json({
    message: "accion de prueba en controlador de articulos",
  });
};

const curso = (req, res) => {
  return res.status(200).json([
    {
      curso: "Master en Mern Stack",
      autor: "Victor robles",
      url: "victorroblesweb.es/mernstack",
    },
  ]);
};

// Metodo para crear articulos en la base de datos.
const crear = (req, res) => {
  // 1. Recoger parametros por post a guardar.
  let parametros = req.body;

  // 2. Validar datos.
  try {
    validar_Articulo(parametros);
  } catch (error) {
    return res.status(404).send({
      status: "error",
      mensaje: "Error al guardar la informacion",
    });
  }

  // 3. Crear el objeto a guardar.
  const articulo = new Articulo(parametros);

  // 4. Asignar valores a objeto basado en el modelo (manual o automatico).articulo.titulo = parametros.titulo; (forma manual).

  // 5. Guardar el articulo en la base de datos.
  articulo.save((error, articulo_guardado) => {
    if (error || !articulo_guardado) {
      return res.status(404).send({
        status: "error",
        mensaje: "Error al guardar la informacion",
      });
    }

    // 6. Devover un resultado.
    return res.status(200).send({
      mensaje: "articulo guardado con exito",
      articulo: articulo_guardado,
    });
  });
};

// Obtener articulos.
const listar = (req, res) => {
  let consulta = Articulo.find({});

  if (req.params.ultimos) {
    consulta.limit(3);
  }

  consulta.sort({ fecha: -1 }).exec((error, articulos) => {
    if (error || !articulos) {
      return res.status(404).send({
        status: "error",
        mensaje: "Error al encontrar articulos",
      });
    }

    return res.status(200).send({
      status: "success",
      contador: articulos.length,
      articulos,
    });
  });
};

const uno = (req, res) => {
  // 1. Recoger id por la url.
  let id = req.params.id;

  // 2. Buscar el articulo.
  Articulo.findById(id, (error, articulo) => {
    // 3. Si no existe devolver error.
    if (error || !articulo) {
      return res.status(404).send({
        status: "error",
        mensaje: "Error al encontrar articulos",
      });
    }

    // 4. Y si no devolver el resultado.
    return res.status(200).send({
      status: "success",
      articulo,
    });
  });
};

const borrar = (req, res) => {
  // 1. recoger parametro por id.
  let articulo_id = req.params.id;
  let parametros = req.body;

  // 2. usar el modelo para eliminar el articulo.
  Articulo.findByIdAndDelete(
    { _id: articulo_id },
    (error, articulo_borrado) => {
      // cuando no se halla indicado el resultado es negativo.
      if (error || !articulo_borrado) {
        return res.status(500).send({
          status: "error",
          mensaje: "Error al borrar dicho articulo.",
        });
      }

      // si todo va bien se da un resultado positivo.
      res.status(200).json({
        status: "success",
        mensaje: "articulo borrado con exito",
        articulo: articulo_borrado,
      });
    }
  );
};

const editar = (req, res) => {
  // recoger el parametro id por url.
  let articulo_id = req.params.id;

  // recoger parametros por el body.
  let parametros = req.body;

  // validar informacion.
  try {
    validar_Articulo(parametros);
  } catch (error) {
    return res.status(400).send({
      status: "error",
      mensaje: "Error al actualizar",
    });
  }

  // buscar y actualizar articulo.
  Articulo.findByIdAndUpdate(
    { _id: articulo_id },
    req.body,
    { new: true },
    (error, articulo_actualizado) => {
      // cuando de error o no se ecuentre el articulo.
      if (error || !articulo_actualizado) {
        res.status(500).json({
          status: "error",
          mensaje: "articulo no encontrado o no existe",
        });
      }

      // devolver un resultado positivo cuando todo valla bien.
      res.status(200).json({
        status: "success",
        mensaje: "articulo actualizado con exito.",
        articulo: articulo_actualizado,
      });
    }
  );
};

const subir = (req, res) => {
  // 1. configurar multer.

  // 2. recoger fichero de la imagen subida.
  // if (!req.file || !req.files) {
  //   res.status(400).json({
  //     status: "error",
  //     mensaje: "error en la peticion",
  //   });
  // }

  // 3. nombre de la imagen.
  let archivo = req.file.originalname;

  // 4. extencion del archivo.
  let archivo_split = archivo.split(".");
  let extencion = archivo_split[1];

  // 5. comprobar la extencion correcta.
  if (
    extencion != "jpg" &&
    extencion != "png" &&
    extencion != "gif" &&
    extencion != "jpeg"
  ) {
    // borrar el archivo y dar respuesta.

    fs.unlink(req.file.path, (error) => {
      res.status(400).send({
        status: "success",
        mensaje: "el formato no es valido",
      });
    });
  } else {
    // parte para editar una imagen. se recoge el parametro id por url.
    let articulo_id = req.params.id;

    // buscar y actualizar articulo.
    Articulo.findByIdAndUpdate(
      { _id: articulo_id },
      { imagen: req.file.filename },
      { new: true },
      (error, articulo_actualizado) => {
        // cuando de error o no se ecuentre el articulo.
        if (error || !articulo_actualizado) {
          res.status(500).json({
            status: "error",
            mensaje: "articulo no encontrado o no existe",
          });
        }

        // devolver un resultado positivo cuando todo valla bien.
        res.status(200).json({
          status: "success",
          mensaje: "articulo actualizado con exito.",
          articulo: articulo_actualizado,
          fichero: req.file,
        });
      }
    );
  }
};

const imagen = (req, res) => {
  let fichero = req.params.fichero;
  let ruta_fisica = "./imagenes/articulo/" + fichero;

  fs.stat(ruta_fisica, (error, existe) => {
    if (existe) {
      return res.sendFile(path.resolve(ruta_fisica));
    } else {
      res.status(404).json({
        status: "error",
        mensaje: "la imagen del articulo no existe",
      });
    }
  });
};

const busqueda = (req, res) => {
  // 1. Sacar el string de la busqueda.
  let busqueda = req.params.busqueda;
  // 2. hacer el findOr y sacarlo por orden de fecha.
  Articulo.find({
    $or: [
      { titulo: { $regex: busqueda, $options: "i" } },
      { contenido: { $regex: busqueda, $options: "i" } },
    ],
  })
    .sort({ fecha: -1 })
    .exec((error, articulo_encontrado) => {
      if (error || !articulo_encontrado || articulo_encontrado.length <= 0) {
        res.status(404).json({
          status: "error",
          mensaje: "articulo no encontrado",
        });
      }

      // 5. Devolver la consulta.
      return res.status(200).send({
        status: "success",
        articulo: articulo_encontrado,
      });
    });
};

// 3. Exportar los metodos.
module.exports = {
  prueba,
  curso,
  crear,
  listar,
  uno,
  borrar,
  editar,
  subir,
  imagen,
  busqueda,
};

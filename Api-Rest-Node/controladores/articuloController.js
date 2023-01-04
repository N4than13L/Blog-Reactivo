// 1. Importar validator y el modelo.
const validator = require("validator");
const Articulo = require("../modelos/Articulo");

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
  } catch (error) {
    return res.status(404).send({
      status: "error",
      mensaje: "Error al guardar la informacion",
    });
  }

  let validar_titulo =
    !validator.isEmpty(parametros.titulo) &&
    validator.isLength(parametros.titulo, { min: 5, max: undefined });

  let validar_contenido = !validator.isEmpty(parametros.contenido);

  if (!validar_titulo || !validar_contenido) {
    throw new Error(
      "Datos estan vacios favor de entrar la informcion adecuadamente"
    );
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

const borrar = (req, res) => {};

// 3. Exportar los metodos.
module.exports = {
  prueba,
  curso,
  crear,
  listar,
  uno,
  borrar,
};

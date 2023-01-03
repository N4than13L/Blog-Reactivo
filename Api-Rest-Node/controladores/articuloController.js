// 1. Crear metodo de prueba.
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

module.exports = {
  prueba,
  curso,
};

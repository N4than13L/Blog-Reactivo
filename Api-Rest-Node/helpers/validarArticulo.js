const validator = require("validator");
const validar_Articulo = (parametros) => {
  let validar_titulo =
    !validator.isEmpty(parametros.titulo) &&
    validator.isLength(parametros.titulo, { min: 5, max: undefined });

  let validar_contenido = !validator.isEmpty(parametros.contenido);

  if (!validar_titulo || !validar_contenido) {
    throw new Error(
      "Datos estan vacios favor de entrar la informcion adecuadamente"
    );
  }
};

module.exports = {
  validar_Articulo,
};

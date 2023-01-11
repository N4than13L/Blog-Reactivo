import React from "react";

export const Crear = () => {
  return (
    <div className="jumbo">
      <h1>Crear articulos</h1>
      <h3>Formulario para crear articulos.</h3>
      {/* Montar el formulario */}
      <form className="formulario">
        <div className="form-group">
          <label htmlFor="titulo">titulo</label>
          <input type="text" name="titulo" placeholder="Titulo" />
        </div>

        <div className="form-group">
          <label htmlFor="contenido">contenido</label>
          <textarea name="contenido" placeholder="Contenido" />
        </div>

        <div className="form-group">
          <label htmlFor="imagen">imagen</label>
          <input type="file" name="file0" id="imagen" />
        </div>

        <input type="submit" value="publicar" className="btn btn-success" />
      </form>
    </div>
  );
};

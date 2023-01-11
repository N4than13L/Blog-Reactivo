import React from "react";

export const Listado = ({ articulos, setArticulos }) => {
  return articulos.map((articulo) => {
    return (
      <article key={articulo._id} className="articulo-item">
        <div className="mascara">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/640px-Unofficial_JavaScript_logo_2.svg.png" />
        </div>
        <div className="datos">
          <h3 className="title">{articulo.titulo}</h3>
          <p className="description">{articulo.contenido}</p>
          <button className="edit">Editar</button>
          <button className="delete">Borrar</button>
        </div>
      </article>
    );
  });
};

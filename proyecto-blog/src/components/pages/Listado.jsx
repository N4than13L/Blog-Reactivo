import React from "react";
import { global } from "../../helpers/global";

export const Listado = ({ articulos, setArticulos }) => {
  const eliminar = (id) => {
    alert(id);
  };
  return articulos.map((articulo) => {
    return (
      <article key={articulo._id} className="articulo-item">
        <div className="mascara">
          {articulo.imagen != "default.png" && (
            <img src={global.url + "imagen/" + articulo.imagen} />
          )}

          {articulo.imagen == "default.png" && (
            <img src="https://thednetworks.com/wp-content/uploads/2012/01/picture_not_available_400-300.png" />
          )}
        </div>
        <div className="datos">
          <h3 className="title">{articulo.titulo}</h3>
          <p className="description">{articulo.contenido}</p>
          <button className="edit">Editar</button>
          <button
            className="delete"
            onClick={() => {
              eliminar(articulos.id);
            }}
          >
            Borrar
          </button>
        </div>
      </article>
    );
  });
};

import React from "react";
import { global } from "../../helpers/global";
import { Peticion } from "../../helpers/Peticion";
import { Link } from "react-router-dom";

export const Listado = ({ articulos, setArticulos }) => {
  const eliminar = async (id) => {
    let { datos } = await Peticion(global.url + "articulo/" + id, "DELETE");
    console.log(datos);

    if (datos.status === "success") {
      let articulo_actualizado = articulos.filter(
        (articulo) => articulo._id !== id
      );
      setArticulos(articulo_actualizado);
    }
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
          <Link to={"/articulo/" + articulo._id}>
            <h3 className="title">{articulo.titulo}</h3>
          </Link>
          <p className="description"> {articulo.contenido}</p>
          <Link to={"/editar/" + articulo._id} className="edit">
            Editar
          </Link>
          <button
            className="delete"
            onClick={() => {
              eliminar(articulo._id);
            }}
          >
            Borrar
          </button>
        </div>
      </article>
    );
  });
};

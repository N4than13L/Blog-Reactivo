import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SideBar = () => {
  const [busqueda, setBusqueda] = useState("");
  const navegar = useNavigate();

  const hacerBusqueda = (e) => {
    e.preventDefault();
    let mi_busqueda = e.target.search_field.value;
    navegar("buscar/" + mi_busqueda, { replace: true });
  };

  return (
    <aside className="card text-center mt-3 p-2 container">
      <div className="search">
        <h3 className="title">Buscador</h3>
        <form className="input-group mb-3" onSubmit={hacerBusqueda}>
          <input className="form-control" type="text" name="search_field" />
          <input
            className="btn btn-success"
            type="submit"
            id="search"
            value="Buscar"
          />
        </form>
      </div>

      {/* <div className="add">
        <h3 className="title">Añadir pelicula</h3>
        <form>
          <input type="text" id="title" placeholder="Titulo" />
          <textarea id="description" placeholder="Descripción"></textarea>
          <input type="submit" id="save" value="Guardar" />
        </form>
      </div> */}
    </aside>
  );
};

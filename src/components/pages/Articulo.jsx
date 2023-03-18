import React from "react";
// 1. se importa los hooks useState y UseEffect.
import { useState, useEffect } from "react";
import { global } from "../../helpers/global";
import { Peticion } from "../../helpers/Peticion";
import { Listado } from "./Listado";
import { useParams } from "react-router-dom";

export const Articulo = () => {
  // 2. Se crea el stado.
  const [articulo, setArticulo] = useState({});
  const [cargando, setCargando] = useState(true);
  const params = useParams();

  // 3. se instancia el useEffect.
  useEffect(() => {
    conseguir_articulo();
  }, []);

  // 4. hacer la funcion correspondiente para conseguir los datos del api.
  const conseguir_articulo = async () => {
    // console.log(await Peticion(global.url + "articulo/" + params.id, "GET"));
    const { datos, cargando } = await Peticion(
      global.url + "articulo/" + params.id,
      "GET"
    );

    if (datos.status === "success") {
      setArticulo(datos.articulo);
    }
    setCargando(false);
  };

  return (
    <div className="card m-4 col-md-4 ">
      {/* hacer la condicion ternaria (o de una sola linea) para recoger la informacion si la tiene el api y si no dar un mensaje de error. */}
      {cargando ? (
        "cargando..."
      ) : (
        <>
          <div className="col-md-4">
            {articulo.imagen != "default.png" && (
              <img src={global.url + "imagen/" + articulo.imagen} />
            )}

            {articulo.imagen == "default.png" && (
              <img src="https://thednetworks.com/wp-content/uploads/2012/01/picture_not_available_400-300.png" />
            )}
          </div>

          <article className="card-footer">
            <h1>{articulo.titulo}</h1>
            <p>{articulo.contenido}</p>
            <span>{articulo.fecha}</span>
          </article>
        </>
      )}
    </div>
  );
};

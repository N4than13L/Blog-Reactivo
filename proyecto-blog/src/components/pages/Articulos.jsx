import React from "react";
// 1. se importa los hooks useState y UseEffect.
import { useState, useEffect } from "react";
import { global } from "../../helpers/global";

export const Articulos = () => {
  // 2. Se crea el stado.
  const [articulos, setArticulos] = useState([]);

  // 3. se instancia el useEffect.
  useEffect(() => {
    conseguir_articulos();
  }, []);

  // 4. hacer la funcion correspondiente para conseguir los datos del api.
  const conseguir_articulos = async () => {
    // obtener la url.
    const url = global.url + "articulos";

    // hacer una variable para el await.
    let peticion = await fetch(url, {
      method: "GET",
    });

    // darle formato JSON a la variable de la peticion.
    let datos = await peticion.json();

    if (datos.status === "success") {
      setArticulos(datos.articulos);
    }
  };

  return (
    <>
      {/* hacer la condicion ternaria (o de una sola linea) para recoger la informacion si la tiene el api y si no dar un mensaje de error. */}
      {articulos.length >= 1 ? (
        articulos.map((articulo) => {
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
        })
      ) : (
        <h1>Errror 404 no hay articulos.</h1>
      )}
    </>
  );
};

import React from "react";
// 1. se importa los hooks useState y UseEffect.
import { useState, useEffect } from "react";
import { global } from "../../helpers/global";
import { Peticion } from "../../helpers/Peticion";
import { Listado } from "./Listado";

export const Articulos = () => {
  // 2. Se crea el stado.
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 3. se instancia el useEffect.
  useEffect(() => {
    conseguir_articulos();
  }, []);

  // 4. hacer la funcion correspondiente para conseguir los datos del api.
  const conseguir_articulos = async () => {
    // console.log(await Peticion(global.url + "articulos", "GET"));
    const { datos, cargando } = await Peticion(global.url + "articulos", "GET");

    if (datos.status === "success") {
      setArticulos(datos.articulos);
    }

    setCargando(false);
  };

  return (
    <div className="col-md-4">
      {/* hacer la condicion ternaria (o de una sola linea) para recoger la informacion si la tiene el api y si no dar un mensaje de error. */}
      {cargando ? "cargando..." : ""}
      {articulos.length >= 1 ? (
        <Listado articulos={articulos} setArticulos={setArticulos} />
      ) : (
        <h1>Errror 404 no hay articulos.</h1>
      )}
    </div>
  );
};

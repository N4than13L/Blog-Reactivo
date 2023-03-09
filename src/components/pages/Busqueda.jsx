import React from "react";
import { useParams } from "react-router-dom";
// 1. se importa los hooks useState y UseEffect.
import { useState, useEffect } from "react";
import { global } from "../../helpers/global";
import { Peticion } from "../../helpers/Peticion";
import { Listado } from "./Listado";

export const Busqueda = () => {
  // 2. Se crea el stado.
  const [articulos_encontrados, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const params = useParams();

  // 3. se instancia el useEffect.
  useEffect(() => {
    conseguir_articulos();
  }, []);

  useEffect(() => {
    conseguir_articulos();
  }, [params]);

  // 4. hacer la funcion correspondiente para conseguir los datos del api.
  const conseguir_articulos = async () => {
    // obtener la url.

    // console.log(await Peticion(global.url + "articulos", "GET"));
    const { datos, cargando } = await Peticion(
      global.url + "buscar/" + params.busqueda,
      "GET"
    );

    if (datos.status === "success") {
      setArticulos(datos.articulos_encontrados);
    } else {
      setArticulos([]);
    }

    setCargando(false);
  };

  return (
    <>
      {/* hacer la condicion ternaria (o de una sola linea) para recoger la informacion si la tiene el api y si no dar un mensaje de error. */}
      {cargando ? (
        "cargando..."
      ) : articulos_encontrados.length >= 1 ? (
        <Listado
          articulos={articulos_encontrados}
          setArticulos={setArticulos}
        />
      ) : (
        <h1>Errror 404 no hay articulos.</h1>
      )}
    </>
  );
};

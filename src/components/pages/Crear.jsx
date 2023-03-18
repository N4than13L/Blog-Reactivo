import React from "react";
import { useState } from "react";
import { useForm } from "../../hooks/useForm.js";
import { Peticion } from "../../helpers/Peticion";
import { global } from "../../helpers/global";

export const Crear = () => {
  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState(false);

  const guardar_articulo = async (e) => {
    e.preventDefault();
    // recoger informacion.
    let nuevo_articulo = formulario;

    // guardar la informacion en la base de datos.
    const { datos, cargando } = await Peticion(
      global.url + "crear",
      "POST",
      nuevo_articulo
    );

    if (datos.status === "success") {
      setResultado(true);
    } else {
      setResultado(false);
    }

    const fileInput = document.querySelector("#file");

    if (datos.status === "success") {
      // subir la imagen.
      const formData = new FormData();
      formData.append("file0");

      const subida = await Peticion(
        global.url + "subir-imagen/" + datos.articulo._id,
        "PUT",
        formData,
        true
      );
      if (subida.datos.status === "success") {
        setResultado(true);
      } else {
        setResultado(false);
      }
    }
  };

  return (
    <div className="jumbo">
      <h1>Crear articulos</h1>
      <h3>Formulario para crear articulos.</h3>

      <strong>{resultado == true ? "Articulo guardado con exito" : ""}</strong>
      <strong>
        {resultado != false ? "Error, faltan datos por enviar" : ""}
      </strong>

      {/* Montar el formulario */}
      <form className="" onSubmit={guardar_articulo}>
        <div className="form-group">
          <label htmlFor="titulo">titulo</label>
          <input
            className="form-control mb-3"
            type="text"
            name="titulo"
            placeholder="Titulo"
            onChange={cambiado}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contenido">contenido</label>
          <textarea
            className="form-control mb-3"
            name="contenido"
            placeholder="Contenido"
            onChange={cambiado}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="imagen">imagen</label>
          <input type="file" name="file0" id="imagen" />
        </div>

        <input type="submit" value="publicar" className="btn btn-success" />
      </form>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm.js";
import { Peticion } from "../../helpers/Peticion";
import { global } from "../../helpers/global";
import { useParams } from "react-router-dom";

export const Editar = () => {
  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState(false);
  const [articulo, setArticulo] = useState(false);
  const params = useParams();

  // 3. se instancia el useEffect.
  useEffect(() => {
    conseguir_articulo();
  }, []);

  // 4. hacer la funcion correspondiente para conseguir los datos del api.
  const conseguir_articulo = async () => {
    // console.log(await Peticion(global.url + "articulo/" + params.id, "GET"));
    const { datos } = await Peticion(
      global.url + "articulo/" + params._id,
      "GET"
    );

    if (datos.status === "success") {
      setArticulo(datos.articulo);
    }
  };

  const editar_articulo = async (e) => {
    e.preventDefault();
    // recoger informacion.
    let nuevo_articulo = formulario;

    // guardar la informacion en la base de datos.
    const { datos } = await Peticion(
      global.url + "articulo/" + params._id,
      "PUT",
      nuevo_articulo
    );

    if (datos.status === "success") {
      setResultado(true);
    } else {
      setResultado(false);
    }

    const fileInput = document.querySelector("#file");

    if (datos.status === "success" && fileInput.files[0]) {
      // subir la imagen.
      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);

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
      <h1>Editar articulo</h1>
      <h3>Formulario para editar {articulo.titulo} </h3>

      <strong>{resultado == true ? "Articulo guardado con exito" : ""}</strong>
      <strong>
        {resultado != false ? "Error, faltan datos por enviar" : ""}
      </strong>

      {/* Montar el formulario */}
      <form className="formulario" onSubmit={editar_articulo}>
        <div className="form-group">
          <label htmlFor="titulo">titulo</label>
          <input
            type="text"
            name="titulo"
            placeholder="Titulo"
            onChange={cambiado}
            defaultValue={articulo.titulo}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contenido">contenido</label>
          <textarea
            name="contenido"
            placeholder="Contenido"
            onChange={cambiado}
            defaultValue={articulo.contenido}
          />
        </div>
        <div className="mascara">
          {articulo.imagen != "default.png" && (
            <img src={global.url + "imagen/" + articulo.imagen} />
          )}

          {articulo.imagen == "default.png" && (
            <img src="https://thednetworks.com/wp-content/uploads/2012/01/picture_not_available_400-300.png" />
          )}
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

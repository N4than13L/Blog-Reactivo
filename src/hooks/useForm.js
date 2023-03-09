import { useState } from "react";

export const useForm = (objetoInicial = {}) => {
  const [formulario, setFormulario] = useState(objetoInicial);

  const serializarFormulario = (formulario) => {
    const formData = new FormData(formulario);
    const objetoCompleto = {};
    for (let [name, value] of formData) {
      objetoCompleto[name] = value;
    }
    return objetoCompleto;
  };

  const enviado = (e) => {
    e.preventDefault();

    // let curso = {
    //   titulo: e.target.titulo.value,
    //   anio: e.target.anio.value,
    //   autor: e.target.autor.value,
    //   descripcion: e.target.descripcion.value,
    //   email: e.target.email.value,
    // };

    let curso = serializarFormulario(e.target);
    setFormulario(curso);
    document.querySelector(".codigo").target.classList.add("enviado");
  };

  const cambiado = ({ target }) => {
    const { name, value } = target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  return {
    formulario,
    enviado,
    cambiado,
  };
};

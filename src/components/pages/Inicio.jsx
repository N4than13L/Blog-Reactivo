import React from "react";
import { Link } from "react-router-dom";

export const Inicio = () => {
  return (
    <div className="jumbo">
      <h1>Bienbenido al blog con react</h1>
      <p>Blog desarrollado con MERN Stack (MongoDB, Express, React, NodeJs)</p>

      <Link className="button" to="/articulos">
        Ver articulos.
      </Link>
    </div>
  );
};

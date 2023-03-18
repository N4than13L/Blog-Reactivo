import React from "react";
import { Link } from "react-router-dom";

export const Inicio = () => {
  return (
    <div className="card mt-2">
      <h1 className="text-center">Bienbenido al blog con react</h1>
      <p className="text-center">
        Blog desarrollado con MERN Stack (MongoDB, Express, React, NodeJs)
      </p>

      <Link className="btn btn-primary" to="/articulos">
        Ver articulos.
      </Link>
    </div>
  );
};

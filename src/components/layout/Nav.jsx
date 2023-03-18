import React from "react";
import { NavLink } from "react-router-dom";

export const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary container">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/articulos">
                articulos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/crear-articulo">
                Crear articulo
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

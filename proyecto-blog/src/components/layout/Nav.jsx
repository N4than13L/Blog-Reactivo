import React from "react";
import { NavLink } from "react-router-dom";

export const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/">Inicio</NavLink>
        </li>
        <li>
          <NavLink to="/articulos">articulos</NavLink>
        </li>
        <li>
          <NavLink to="/crear-articulo">Crear articulo</NavLink>
        </li>
      </ul>
    </nav>
  );
};

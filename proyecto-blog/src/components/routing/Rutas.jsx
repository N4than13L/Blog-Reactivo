import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Inicio } from "../pages/Inicio";
import { Articulos } from "../pages/Articulos";
import { Nav } from "../layout/Nav";
import { Header } from "../layout/Header";
import { SideBar } from "../layout/SideBar";
import { Footer } from "../layout/Footer";

// componentes secundarios
import { Crear } from "../pages/Crear";
import { Busqueda } from "../pages/Busqueda";
import { Articulo } from "../pages/Articulo";

export const Rutas = () => {
  return (
    <BrowserRouter>
      {/* Layout */}
      <Header />
      <Nav />

      {/* Contenido */}
      <section id="content" className="content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/articulos" element={<Articulos />} />
          <Route path="/crear-articulo" element={<Crear />} />
          <Route path="/buscar/:busqueda" element={<Busqueda />} />
          <Route path="/articulo/:id" element={<Articulo />} />

          {/* ruta 404 */}
          <Route
            path="*"
            element={
              <div className="jumbo">
                <h1>Error 404!</h1>
              </div>
            }
          />
        </Routes>
      </section>
      <SideBar />
      <Footer />
    </BrowserRouter>
  );
};

import { useState } from "react";
import "./App.css";
import { Articulos } from "./components/pages/Articulos";
import { Crear } from "./components/pages/Crear";
import { Inicio } from "./components/pages/Inicio";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <h1>Blog React</h1>
      <Inicio />
      <Articulos />
      <Crear />
    </div>
  );
}

export default App;

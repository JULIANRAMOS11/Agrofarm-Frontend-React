// src/App.js
import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import PigForm from "./components/PigForm";
import PigList from "./components/PigList";

/**
 * Componente principal de la aplicación AGROFARM.
 * Módulo: Gestión básica de cerdos (frontend de ejemplo).
 */
function App() {
  // Estado con algunos cerdos de ejemplo
  const [pigs, setPigs] = useState([
    {
      id: 1,
      codigo: "C-001",
      nombre: "Luna",
      peso: 120,
      fechaNacimiento: "2024-01-10",
      estado: "Activo",
    },
    {
      id: 2,
      codigo: "C-002",
      nombre: "Max",
      peso: 98,
      fechaNacimiento: "2024-02-05",
      estado: "En cuarentena",
    },
  ]);

  /**
   * Agrega un nuevo cerdo a la lista.
   */
  const handleAddPig = (nuevoCerdo) => {
    setPigs((prev) => [
      ...prev,
      {
        ...nuevoCerdo,
        id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1,
      },
    ]);
  };

  /**
   * Cambia el estado del cerdo (Activo / En cuarentena).
   */
  const handleToggleStatus = (id) => {
    setPigs((prev) =>
      prev.map((cerdo) =>
        cerdo.id === id
          ? {
              ...cerdo,
              estado: cerdo.estado === "Activo" ? "En cuarentena" : "Activo",
            }
          : cerdo
      )
    );
  };

  return (
    <div className="app-container">
      <Header />
      <main className="content">
        <section className="panel">
          <h2>Registro de cerdos</h2>
          <PigForm onAddPig={handleAddPig} />
        </section>

        <section className="panel">
          <h2>Listado de cerdos</h2>
          <PigList pigs={pigs} onToggleStatus={handleToggleStatus} />
        </section>
      </main>
    </div>
  );
}

export default App;

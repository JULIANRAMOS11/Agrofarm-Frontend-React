// src/components/PigList.jsx
import React from "react";

/**
 * Tabla que muestra el listado de cerdos registrados.
 */
function PigList({ pigs, onToggleStatus }) {
  if (pigs.length === 0) {
    return <p>No hay cerdos registrados todavía.</p>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>Peso (kg)</th>
          <th>Fecha nacimiento</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {pigs.map((cerdo) => (
          <tr key={cerdo.id}>
            <td>{cerdo.codigo}</td>
            <td>{cerdo.nombre}</td>
            <td>{cerdo.peso}</td>
            <td>{cerdo.fechaNacimiento}</td>
            <td>{cerdo.estado}</td>
            <td>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => onToggleStatus(cerdo.id)}
              >
                Cambiar estado
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PigList;

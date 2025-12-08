// src/components/PigForm.jsx
import React, { useState } from "react";

/**
 * Formulario controlado para registrar cerdos.
 * Contiene validaciones básicas de los campos.
 */
function PigForm({ onAddPig }) {
  const [form, setForm] = useState({
    codigo: "",
    nombre: "",
    peso: "",
    fechaNacimiento: "",
    estado: "Activo",
  });

  const [errors, setErrors] = useState({});

  // Actualiza el estado del formulario cuando el usuario escribe
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Validaciones simples de los campos
  const validate = () => {
    const newErrors = {};

    if (!form.codigo.trim()) newErrors.codigo = "El código es obligatorio";
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!form.peso || Number(form.peso) <= 0)
      newErrors.peso = "El peso debe ser mayor a 0";
    if (!form.fechaNacimiento)
      newErrors.fechaNacimiento = "La fecha de nacimiento es obligatoria";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Envía el formulario
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    // En un escenario real, aquí se llamaría al backend (API REST).
    onAddPig({
      codigo: form.codigo.trim(),
      nombre: form.nombre.trim(),
      peso: Number(form.peso),
      fechaNacimiento: form.fechaNacimiento,
      estado: form.estado,
    });

    // Reinicia el formulario
    setForm({
      codigo: "",
      nombre: "",
      peso: "",
      fechaNacimiento: "",
      estado: "Activo",
    });
    setErrors({});
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="codigo">Código</label>
        <input
          id="codigo"
          name="codigo"
          type="text"
          value={form.codigo}
          onChange={handleChange}
        />
        {errors.codigo && <span className="error">{errors.codigo}</span>}
      </div>

      <div className="form-row">
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={form.nombre}
          onChange={handleChange}
        />
        {errors.nombre && <span className="error">{errors.nombre}</span>}
      </div>

      <div className="form-row">
        <label htmlFor="peso">Peso (kg)</label>
        <input
          id="peso"
          name="peso"
          type="number"
          step="0.1"
          value={form.peso}
          onChange={handleChange}
        />
        {errors.peso && <span className="error">{errors.peso}</span>}
      </div>

      <div className="form-row">
        <label htmlFor="fechaNacimiento">Fecha nacimiento</label>
        <input
          id="fechaNacimiento"
          name="fechaNacimiento"
          type="date"
          value={form.fechaNacimiento}
          onChange={handleChange}
        />
        {errors.fechaNacimiento && (
          <span className="error">{errors.fechaNacimiento}</span>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="estado">Estado</label>
        <select
          id="estado"
          name="estado"
          value={form.estado}
          onChange={handleChange}
        >
          <option value="Activo">Activo</option>
          <option value="En cuarentena">En cuarentena</option>
          <option value="Vendido">Vendido</option>
        </select>
      </div>

      <button type="submit" className="btn-primary">
        Guardar cerdo
      </button>
    </form>
  );
}

export default PigForm;

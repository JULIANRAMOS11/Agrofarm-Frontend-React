import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (username.trim() === "" || password.trim() === "") {
      setError("Debe ingresar usuario y contraseña.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Error al iniciar sesión.");
        return;
      }

      localStorage.setItem("token", "api-login-ok");
      localStorage.setItem("user", JSON.stringify(data.usuario));

      nav("/dashboard");
    } catch (e2) {
      setError("No se pudo conectar con la API (¿está corriendo en 3001?).");
    } finally {
      setLoading(false);
    }
  };

  const disabled = loading || username.trim() === "" || password.trim() === "";

  return (
    <div style={{ padding: 24 }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div style={{ marginTop: 8 }}>
          <input
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p style={{ marginTop: 10, color: "#f97316", fontSize: 14 }}>
            {error}
          </p>
        )}

        <button style={{ marginTop: 12 }} type="submit" disabled={disabled}>
          {loading ? "Ingresando..." : "Entrar"}
        </button>
      </form>

      <p style={{ marginTop: 12 }}>
        ¿No tienes cuenta? <Link to="/register">Registrarse</Link>
      </p>
    </div>
  );
}

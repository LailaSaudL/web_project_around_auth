// src/components/Login/Login.jsx
// This component handles user authentication (signin)

import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
  // State for form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    // Call the onLogin function passed from parent
    onLogin(formData.email, formData.password);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Inicia sesion</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="auth__input"
          placeholder="Correo electronico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          className="auth__input"
          placeholder="Contrasena"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="auth__button">
          Iniciar sesion
        </button>
      </form>
      <p className="auth__text">
        ¿Aun no eres miembro?{" "}
        <Link to="/signup" className="auth__link">
          Registrate aqui
        </Link>
      </p>
    </div>
  );
}

export default Login;

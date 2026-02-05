// src/components/Register/Register.jsx
// This component handles user registration (signup)

import { useState } from "react";
import { Link } from "react-router-dom";
import "../Login/Login.css"; // Reuse the same styles

function Register({ onRegister }) {
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
    // Call the onRegister function passed from parent
    onRegister(formData.email, formData.password);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Registrarse</h2>
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
          Registrarse
        </button>
      </form>
      <p className="auth__text">
        ¿Ya eres miembro?{" "}
        <Link to="/signin" className="auth__link">
          Inicia sesion aqui
        </Link>
      </p>
    </div>
  );
}

export default Register;

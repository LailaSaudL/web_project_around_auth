// src/components/Header/Header.jsx
// Header component that displays different content based on auth status

import { Link, useLocation } from "react-router-dom";
import logo from "../../../images/logo.png";

function Header({ isLoggedIn, userEmail, onLogout }) {
  const location = useLocation();

  return (
    <header className="header page__section">
      <img
        src={logo}
        alt="Around the U.S logo"
        className="logo header__logo"
      />

      <nav className="header__nav">
        {isLoggedIn ? (
          // Content for authorized users
          <>
            <span className="header__email">{userEmail}</span>
            <button
              className="header__link header__link_logout"
              onClick={onLogout}
            >
              Cerrar sesion
            </button>
          </>
        ) : (
          // Content for unauthorized users
          <>
            {location.pathname === "/signin" && (
              <Link to="/signup" className="header__link">
                Registrarse
              </Link>
            )}
            {location.pathname === "/signup" && (
              <Link to="/signin" className="header__link">
                Iniciar sesion
              </Link>
            )}
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;

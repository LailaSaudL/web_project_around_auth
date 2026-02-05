// /src/components/App.jsx

import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import api from "../utils/api";
import * as auth from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  // Estados principales
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);

  // Auth states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // InfoTooltip states
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  // Error state for debugging
  const [apiError, setApiError] = useState(null);

  // Hook for navigation/redirect
  const navigate = useNavigate();

  // Check token on mount (persistent login)
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          // Response format: { data: { email, _id } }
          setIsLoggedIn(true);
          setUserEmail(res.data.email);
          navigate("/");
        })
        .catch((error) => {
          console.error("Token validation failed:", error);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  // Load user data and cards when logged in
  useEffect(() => {
    if (isLoggedIn) {
      setApiError(null);

      api
        .getUserInfo()
        .then((userData) => {
          console.log("User data received:", userData);
          setCurrentUser(userData);
        })
        .catch((error) => {
          console.error("Error al obtener usuario:", error);
          setApiError(`Error loading user: ${error}`);
        });

      api
        .getInitialCards()
        .then((cardsData) => {
          console.log("Cards received:", cardsData);
          setCards(cardsData);
        })
        .catch((error) => {
          console.error("Error al obtener tarjetas:", error);
          setApiError(`Error loading cards: ${error}`);
        });
    }
  }, [isLoggedIn]);

  // Handle login
  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          setUserEmail(email);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setIsRegistrationSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  // Handle registration
  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setIsRegistrationSuccess(true);
        setIsInfoTooltipOpen(true);
        navigate("/signin");
      })
      .catch((error) => {
        console.error("Registration error:", error);
        setIsRegistrationSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  // Handle logout
  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserEmail("");
    setCurrentUser({});
    setCards([]);
    navigate("/signin");
  }

  // Close InfoTooltip
  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        handleClosePopup();
      })
      .catch((error) => console.error("Error al actualizar perfil:", error));
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        handleClosePopup();
      })
      .catch((error) => console.error("Error al actualizar avatar:", error));
  }

  function handleCardLike(card) {
    const isLiked = card.isLiked;
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error("Error al cambiar like:", error));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
      })
      .catch((error) => console.error("Error al eliminar tarjeta:", error));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((error) => console.error("Error al agregar tarjeta:", error));
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
      }}
    >
      <div className="page__content">
        <Header
          isLoggedIn={isLoggedIn}
          userEmail={userEmail}
          onLogout={handleLogout}
        />

        {/* Debug: Show API errors */}
        {apiError && (
          <div style={{ background: "red", color: "white", padding: "10px", textAlign: "center" }}>
            {apiError}
          </div>
        )}

        {/* Routes configuration */}
        <Routes>
          {/* Public route: Login page */}
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />

          {/* Public route: Register page */}
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />

          {/* Protected route: Main application (only for logged-in users) */}
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  cards={cards}
                  popup={popup}
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />

        {/* InfoTooltip for registration success/error */}
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeInfoTooltip}
          isSuccess={isRegistrationSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

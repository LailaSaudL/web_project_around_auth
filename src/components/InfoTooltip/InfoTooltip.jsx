// src/components/InfoTooltip/InfoTooltip.jsx
// Modal component that shows registration success or error message

import "./InfoTooltip.css";

function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
  return (
    <div className={`tooltip ${isOpen ? "tooltip_opened" : ""}`}>
      <div className="tooltip__container">
        {/* Close button */}
        <button
          type="button"
          className="tooltip__close"
          onClick={onClose}
          aria-label="Cerrar"
        />

        {/* Success or error icon */}
        <div
          className={`tooltip__icon ${
            isSuccess ? "tooltip__icon_success" : "tooltip__icon_error"
          }`}
        />

        {/* Message text */}
        <p className="tooltip__message">
          {message || (isSuccess
            ? "¡Correcto! Ya estás registrado."
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo.")}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;

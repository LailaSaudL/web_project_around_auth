import { useRef, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  // Obtener la función del contexto
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  // Ref para acceder al input directamente
  const avatarInputRef = useRef();

  // Handler para enviar el formulario
  function handleSubmit(event) {
    event.preventDefault();
    handleUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  }

  return (
    <form
      className="popup__form"
      name="edit-avatar-form"
      id="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_avatar-url"
          id="avatar-url"
          name="avatar"
          placeholder="Enlace de avatar"
          required
          type="url"
          ref={avatarInputRef}
        />
        <span className="popup__error" id="avatar-url-error"></span>
      </label>
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}

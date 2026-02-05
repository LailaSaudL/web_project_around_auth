import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  // Obtener datos y función del contexto
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  // Estados controlados para los inputs
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Cargar valores actuales cuando currentUser cambie
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setDescription(currentUser.about || "");
    }
  }, [currentUser]);

  // Handlers para actualizar los estados
  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  // Handler para enviar el formulario
  function handleSubmit(event) {
    event.preventDefault();
    handleUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <form
      className="popup__form"
      name="edit-profile-form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_name"
          id="name"
          maxLength="40"
          minLength="2"
          name="name"
          placeholder="Nombre"
          required
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="name-error"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_about"
          id="about"
          maxLength="200"
          minLength="2"
          name="about"
          placeholder="Acerca de mí"
          required
          type="text"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error" id="about-error"></span>
      </label>
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}

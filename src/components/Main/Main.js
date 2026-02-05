import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Popup from "./components/Popup/Popup";
import Card from "./components/Card/Card";
import NewCard from "./components/form/NewCard/NewCard";
import EditProfile from "./components/form/NewCard/EditProfile/EditProfile";
import EditAvatar from "./components/form/NewCard/EditAvatar/EditAvatar";

export default function Main({
  cards,
  popup,
  onOpenPopup,
  onClosePopup,
  onCardLike,
  onCardDelete,
}) {
  // Obtener datos del usuario desde el contexto
  const { currentUser } = useContext(CurrentUserContext);

  // Configuración de los popups
  const newCardPopup = { title: "Nuevo lugar", children: <NewCard /> };
  const editProfilePopup = { title: "Editar perfil", children: <EditProfile /> };
  const editAvatarPopup = { title: "Cambiar foto de perfil", children: <EditAvatar /> };

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__image-container">
          <img
            src={currentUser.avatar}
            alt="User avatar"
            className="profile__avatar"
            onClick={() => onOpenPopup(editAvatarPopup)}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            aria-label="Edit profile"
            className="profile__edit-button"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          />
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          aria-label="Add card"
          className="profile__add-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        />
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onOpenPopup={onOpenPopup}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default function Card({ card, onCardLike, onCardDelete, onOpenPopup }) {
  const { name, link, isLiked } = card;

  // Configuración del popup de imagen
  const imagePopup = {
    title: null,
    children: <img className="popup__image" src={link} alt={name} />,
  };

  // Handler para el click en like
  function handleLikeClick() {
    onCardLike(card);
  }

  // Handler para el click en delete
  function handleDeleteClick() {
    onCardDelete(card);
  }

  // Clase dinámica para el botón like
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onOpenPopup(imagePopup)}
      />
      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
        onClick={handleDeleteClick}
      />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}

export default function ImagePopup({ onClose, card }) {
  if (!card) return null;

  return (
    <div className="popup">
      <div className="popup__content popup__content_content_image">
        <button
          aria-label="Close modal"
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        <img src={card.link} alt={card.name} className="popup__image" />
      </div>
    </div>
  );
}


import "./VerticalCard.css";
const VerticalCard = ({ title, description, image, link }) => {
  return (
    <div className="vertical-card">
      <div className="image-container">
        <img src={image} alt={title} className="card-image" />
      </div>
      <div className="card-content">
        <div>
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default VerticalCard;

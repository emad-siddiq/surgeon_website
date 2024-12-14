import React from "react";
import PropTypes from "prop-types";
import "./Card.css";

const Card = ({ image, altText, title, credentials, description, actionLink, actionText, reverse }) => (
  <div className={`experience-card ${reverse ? "reverse" : ""}`}>
    <div className="experience-card-content">
      <div className="experience-card-image">
        <img src={image} alt={altText} />
      </div>
      <div className="experience-card-text">
        <h2 className="card-title">
          {title}
          <div className="card-credentials">{credentials}</div>
        </h2>
        <p className="card-description">{description}</p>
        <div className="card-action">
          <a href={actionLink} className="learn-more-button">
            {actionText}
          </a>
        </div>
      </div>
    </div>
  </div>
);

Card.propTypes = {
  image: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  credentials: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actionLink: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  reverse: PropTypes.bool,
};

Card.defaultProps = {
  reverse: false,
};

export default Card;

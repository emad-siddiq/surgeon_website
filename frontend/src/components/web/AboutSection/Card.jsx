import React from "react";
import PropTypes from "prop-types";
import "./Card.css";

const Card = ({ image, altText, title, credentials, description, actionLink, actionText, reverse, className }) => (
  <div className={`experience-card ${reverse ? "reverse" : ""} ${className}`}>
    <div className="experience-card-content">
      <div className="experience-card-image">
        <img src={image} alt={altText} />
      </div>
      <div className="experience-card-text">
        <h2 className="card-title">
          {title}
          <div className="card-credentials">{credentials}</div>
        </h2>
        {typeof description === 'string' ? (
          <p className="card-description">{description}</p>
        ) : (
          description.map((paragraph, index) => (
            <p key={index} className="card-description">{paragraph}</p>
          ))
        )}
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
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  actionLink: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  reverse: PropTypes.bool,
  className: PropTypes.string
};

Card.defaultProps = {
  reverse: false,
  className: ''
};

export default Card;
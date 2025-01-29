import React from "react";
import PropTypes from "prop-types";
import "./HorizontalCard.css";

const HorizontalCard = ({
  image,
  altText,
  title,
  credentials,
  paragraphs = [],
  gaps = [],
  actionLink,
  actionText,
  reverse,
  className,
}) => {
  const processGapValue = (gap) => {
    if (typeof gap === 'number') {
      return `${gap}px`;
    }
    if (typeof gap === 'string' && gap.match(/^-?[\d.]+(%|px|rem|em|vh)$/)) {
      return gap;
    }
    return '0px';
  };

  return (
    <div className={`horizontal-card ${reverse ? "reverse" : ""} ${className}`}>
      <div className="card-content">
        <div className="card-image">
          <img src={image} alt={altText} />
        </div>
        <div className="card-text">
          <h2 className="card-title">
            {title}
            <div className="card-credentials">{credentials}</div>
          </h2>
          
          <div className="card-paragraphs" style={{ 
            marginTop: gaps.length > 0 ? processGapValue(gaps[0]) : '0px' 
          }}>
            {paragraphs.map((paragraph, index) => (
              <div key={index} className="paragraph-container">
                <p className="card-description">{paragraph}</p>
                {index < paragraphs.length - 1 && (
                  <div
                    className="paragraph-gap"
                    style={{
                      marginBottom: processGapValue(gaps[index + 1]) // Offset by 1 since first gap is for initial spacing
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="card-action">
            <a href={actionLink} className="card-button">
              {actionText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

HorizontalCard.propTypes = {
  image: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  credentials: PropTypes.string.isRequired,
  paragraphs: PropTypes.arrayOf(PropTypes.string),
  gaps: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])),
  actionLink: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  reverse: PropTypes.bool,
  className: PropTypes.string,
};

HorizontalCard.defaultProps = {
  reverse: false,
  className: "",
  paragraphs: [],
  gaps: [],
};

export default HorizontalCard;

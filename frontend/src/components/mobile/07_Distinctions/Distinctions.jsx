import React from 'react';
import './Distinctions.css';
import award from "../../../assets/images/distinctions/1.jpeg";
import surgery from "../../../assets/images/distinctions/surgeries.jpg";

// Card Component
const Card = ({ title, description, image, link }) => {
  return (
    <div className="distinctions-card">
      <div className="distinctions-image-container">
        <img
          src={image}
          alt={title}
          className="distinctions-card-image"
        />
      </div>
      <div className="distinctions-card-content">
        <h3 className="distinctions-card-title">{title}</h3>
        <p className="distinctions-card-description">
          {description}
        </p>
        {link && (
          <a href={link} className="distinctions-learn-more">
            Learn More
          </a>
        )}
      </div>
    </div>
  );
};

// Distinctions Component
const Distinctions = () => {
  return (
    <div className="distinctions-background">
      <div className="distinctions-container">
        <div className="distinctions-header">
          <h2 className="distinctions-title">Professional Distinctions</h2>
        </div>
        <div className="distinctions-grid">
          <Card
            title="Presidential Award for Surgical Excellence"
            description="Dr. Ghulam Siddiq has been honored with a Presidential Award, recognizing his exceptional skills and significant contributions to medical science. This prestigious acknowledgment reflects his unparalleled expertise, precision, and dedication to advancing surgical techniques in Pakistan."
            image={award}
            link="#"
          />
          <Card
            title="Extensive Bariatric Surgery Expertise"
            description="With an impressive record of 970 Bariatric surgery procedures, Dr. Siddiq stands as a pioneering figure in metabolic and weight-loss surgical interventions. His extensive experience demonstrates not just technical proficiency, but a commitment to transforming patient lives through advanced surgical solutions."
            image={surgery}
            link="#"
          />
        </div>
      </div>
    </div>
  );
};

export default Distinctions;
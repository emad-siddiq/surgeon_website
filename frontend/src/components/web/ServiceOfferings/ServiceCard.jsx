import React from 'react';
import './ServiceCard.css';
import AnimatedCounter from "./../../common/Counters/AnimatedCounter";

const ServiceCard = ({ 
  title, 
  description, 
  services, 
  learnMoreLink, 
  learnMoreText = 'Learn More' 
}) => {
  return (
    <div className="services-card">
      <h2 className="services-title">{title}</h2>
      <div className="services-description">
        {typeof description === 'string' ? (
          <p>{description}</p>
        ) : (
          description
        )}
        
        {services && (
          <ul className="services-list">
            {services.map((service, index) => (
              <li key={index}>
                {service.name}
                <AnimatedCounter 
                  initialCount={service.count} 
                  speed={service.speed || 100} 
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      {learnMoreLink && (
        <div className="services-learn-more-container">
          <a href={learnMoreLink} className="services-learn-more">
            {learnMoreText}
          </a>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
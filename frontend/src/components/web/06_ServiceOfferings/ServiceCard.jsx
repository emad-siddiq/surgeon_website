import React from 'react';
import './ServiceCard.css';

const AnimatedCounter = ({ initialCount, speed = 50 }) => {
  const [count, setCount] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const counterRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [isVisible]);

  React.useEffect(() => {
    let interval;
    if (isVisible) {
      interval = setInterval(() => {
        setCount(prevCount => {
          const nextCount = prevCount + Math.ceil(initialCount / speed);
          if (nextCount >= initialCount) {
            clearInterval(interval);
            return initialCount;
          }
          return nextCount;
        });
      }, 50);
    }

    return () => clearInterval(interval);
  }, [isVisible, initialCount, speed]);

  return (
    <span 
      ref={counterRef} 
      className="animated-counter"
    >
      {count}+
    </span>
  );
};

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
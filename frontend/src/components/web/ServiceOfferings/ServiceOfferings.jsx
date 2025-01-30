import React from 'react';
import AnimatedCounter from './../../common/Counters/AnimatedCounter';
import './ServiceOfferings.css';
import AnimationGrid from './../../common/Animations/AnimationGrid';

const ServiceOfferings = () => {
  const procedureData = [
    { 
      name: 'Laparoscopic Cholecystectomy', 
      count: 9000, 
      speed: 50,
      color: 'blue',
      description: 'Gall Bladder Surgery',
      link: '/about'
    },
    { 
      name: 'Appendix Surgery', 
      count: 8000, 
      speed: 120,
      color: 'red',
      description: 'Minimally Invasive',
      link: '/about'
    },
    { 
      name: 'Laparoscopic Surgery', 
      count: 1500, 
      speed: 80,
      color: 'green',
      description: 'Advanced Techniques',
      link: '/about'
    },
    { 
      name: 'Colon Surgery', 
      count: 65, 
      speed: 90,
      color: 'purple',
      description: 'Complex Procedures',
      link: '/about'
    },
    { 
      name: 'Anterior Resection', 
      count: 88, 
      speed: 110,
      color: 'teal',
      description: 'Precise Surgical Approach',
      link: '/about'
    },
    { 
      name: 'Low Anterior Resection', 
      count: 79, 
      speed: 100,
      color: 'orange',
      description: 'Specialized Technique',
      link: '/about'
    },
    { 
      name: 'Right Hemicolectomy', 
      count: 63, 
      speed: 70,
      color: 'indigo',
      description: 'Right-Side Colon Surgery',
      link: '/about'
    },
    { 
      name: 'Left Hemicolectomy', 
      count: 71, 
      speed: 75,
      color: 'pink',
      description: 'Left-Side Colon Surgery',
      link: '/about'
    },
    { 
      name: 'Partial Gastrectomy', 
      count: 59, 
      speed: 95,
      color: 'brown',
      description: 'Stomach Partial Removal',
      link: '/about'
    },
    { 
      name: 'Esophagectomy', 
      count: 82, 
      speed: 105,
      color: 'navy',
      description: 'Esophagus Surgical Removal',
      link: '/about'
    }
  ];

  return (
   
  <div className="service-offerings-wrapper">
    <AnimationGrid/>
    <div className="surgical-procedures-container">
      
      <div className="surgical-procedures-header">
        <div className="surgical-icon">🔬</div>
        <h2>Surgical Expertise & Experience</h2>
      </div>
      
      <div className="surgical-procedures-grid">
        {procedureData.map((procedure, index) => (
          <div 
            key={index} 
            className={`surgical-procedure-card surgical-${procedure.color}`}
          >
            <a href={procedure.link} className="procedure-link">
              <div className="procedure-header">
                <h3>{procedure.name}</h3>
              </div>
              <div className="procedure-details">
                <span className="procedure-description">
                  {procedure.description}
                </span>
                <span className="procedure-count">
                  <AnimatedCounter 
                    initialCount={procedure.count} 
                    speed={procedure.speed} 
                  />
                </span>
              </div>
            </a>
          </div>
        ))}
      </div>
      
      <div className="surgical-cta-container">
        <a href="/services" className="surgical-cta-button">
          Explore All Surgical Services
        </a>
      </div>
    </div>
  </div>
);
    
};

export default ServiceOfferings;
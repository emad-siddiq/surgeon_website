import React, { useState, useEffect, useRef } from 'react';
import './ServiceOfferings.css';

const AnimatedCounter = ({ initialCount, speed = 50 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
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

  useEffect(() => {
    let interval;
    if (isVisible) {
      interval = setInterval(() => {
        setCount(prevCount => {
          // Increase the increment time by dividing the increment by the speed
          const nextCount = prevCount + Math.ceil(initialCount / speed);
          if (nextCount >= initialCount) {
            clearInterval(interval);
            return initialCount;
          }
          return nextCount;
        });
      }, 50); // Slightly increased interval time
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

const ServiceOfferings = () => {
  // Predefined list of counts that can be easily modified
  const serviceCounts = [
    85, 92, 78, 65, 
    88, 79, 63, 71, 
    59, 82
  ];

  return (
    <div className="services-container">
      <div className="services-card">
        <h2 className="services-title">
           Surgical Expertise
        </h2>
        <div className="services-description">
          <p>
            Dr. Ghulam Siddiq brings decades of surgical expertise, offering a wide range of advanced medical services: </p>
          <ul className="services-list">
            <li>
              Gall Bladder Surgery 
              <AnimatedCounter initialCount={serviceCounts[0]} speed={100} />
            </li>
            <li>
              Appendix Surgery 
              <AnimatedCounter initialCount={serviceCounts[1]} speed={120} />
            </li>
            <li>
              Laparoscopic Surgery 
              <AnimatedCounter initialCount={serviceCounts[2]} speed={80} />
            </li>
            <li>
              Colon Surgery 
              <AnimatedCounter initialCount={serviceCounts[3]} speed={90} />
            </li>
            <li>
              Anterior Resection 
              <AnimatedCounter initialCount={serviceCounts[4]} speed={110} />
            </li>
            <li>
              Low Anterior Resection 
              <AnimatedCounter initialCount={serviceCounts[5]} speed={100} />
            </li>
            <li>
              Right Hemicolectomy 
              <AnimatedCounter initialCount={serviceCounts[6]} speed={70} />
            </li>
            <li>
              Left Hemicolectomy 
              <AnimatedCounter initialCount={serviceCounts[7]} speed={85} />
            </li>
            <li>
              Partial Gastrectomy 
              <AnimatedCounter initialCount={serviceCounts[8]} speed={95} />
            </li>
            <li>
              Esophagectomy 
              <AnimatedCounter initialCount={serviceCounts[9]} speed={105} />
            </li>
          </ul>
        </div>
        <a href="/services" className="services-learn-more">
          Explore Full Service Range
        </a>
      </div>

      <div className="separator"></div>

      <div className="services-card">
        <h2 className="services-title">
          Patient-Centered Surgical Care
        </h2>
        <div className="services-description">
          <p>
            With 38 years of surgical experience, Dr. Siddiq specializes in delivering personalized, state-of-the-art medical interventions. His holistic approach ensures comprehensive patient support throughout the entire treatment journey.
          </p>
          <p>
            From initial consultation to post-operative care, Dr. Siddiq and his team provide unparalleled medical expertise, advanced diagnostic capabilities, and compassionate treatment strategies tailored to individual patient needs.
          </p>
          <p>
            Our commitment extends beyond surgical procedures, focusing on patient education, emotional support, and long-term health management.
          </p>
        </div>
        <a href="/patient-care" className="services-learn-more">
          Learn About Our Approach
        </a>
      </div>
    </div>
  );
};

export default ServiceOfferings;
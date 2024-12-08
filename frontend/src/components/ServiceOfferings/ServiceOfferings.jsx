import React from 'react';
import './ServiceOfferings.css';

const ServiceOfferings = () => {
  return (
    <div className="services-container">
      <div className="services-card">
        <h2 className="services-title">
          Comprehensive Surgical <br /> Service Offerings
        </h2>
        <div className="services-description">
          <p>
            Dr. Ghulam Siddiq brings decades of surgical expertise, offering a wide range of advanced medical services tailored to meet complex patient needs. His approach combines cutting-edge surgical techniques with compassionate patient care.
          </p>
          <ul className="services-list">
            <li>Colostomy Procedures</li>
            <li>Laparoscopic Anti-Reflux Surgery For Heartburn</li>
            <li>Advanced Laparoscopic Gastrointestinal Surgery</li>
            <li>Complex Hernia Repairs</li>
            <li>Precision Hemicolectomies</li>
            <li>Low Anterior Resection</li>
            <li>Abdominal Perineal Resection (APR)</li>
            <li>Minimally Invasive Adrenalectomy</li>
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
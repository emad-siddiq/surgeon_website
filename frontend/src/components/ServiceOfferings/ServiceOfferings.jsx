import React from 'react';
import './ServiceOfferings.css';

const ServiceOfferings = () => {
  return (
    <div className="services-container">
      <div className="services-card">
        <h2 className="services-title">
          Wide List of Service <br /> Offerings
        </h2>
        <div className="services-description">
          <p>
            There is a huge variety of specialities and services offered by Dr. Ghulam Siddiq.
          </p>
          <ul className="services-list">
            <li>Colostomy</li>
            <li>Laparoscopic Anti-Reflux Surgery For Heartburn</li>
            <li>Laparoscopic Gastrointestinal Surgery</li>
            <li>Hernias</li>
            <li>Hemicolectomies</li>
            <li>Low anterior resection</li>
            <li>APR</li>
            <li>Adrenalectomy</li>
          </ul>
        </div>
        <a href="#" className="services-learn-more">Learn More</a>
      </div>

      <div className="separator"></div>

      <div className="services-card">
        <h2 className="services-title">
          More Services Offered
        </h2>
        <div className="services-description">
          <p>
            Explore the full range of medical services provided by Dr. Ghulam Siddiq.
          </p>
        </div>
        <a href="#" className="services-learn-more">Learn More</a>
      </div>
    </div>
  );
};

export default ServiceOfferings;

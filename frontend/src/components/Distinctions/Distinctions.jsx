import React from 'react';
import './Distinctions.css';
import award from "../../assets/images/distinctions/1.jpeg";
import surgery from "../../assets/images/distinctions/surgeries.jpg";

// Card Component
const Card = ({ title, description, image }) => {
  return (
    <div className="card">
      <div className="image-container">
        <img
          src={image}
          alt={title}
          className="card-image"
        />
      </div>
      <div className="card-content">
        <div className="card-header">
          <h5>
            <a href="#" className="card-title">{title}</a>
          </h5>
        </div>
        <p className="card-description">
          {description}
        </p>
      </div>
    </div>
  );
};

// Distinctions Component
const Distinctions = () => {
  return (
    <div className="distinctions-container">
      <div className="distinctions-header">
        <p className="distinctions-title">Various Distinctions</p>
      </div>
      <div className="distinctions-grid">
        <Card
          title="Dr. Ghulam Siddiq has received Presidential Award on his skills."
          description="Medical procedures are a very sensitive topic which require great skills to perform surgeries. Dr. Ghulam Siddiq has earned the trust of many with his attention to detail and steady hand procedures. In this view he has received award from President."
          image={award}
        />
        <Card
          title="970 Bariatic Surgery Procedures"
          description="This number of Bariatic surgeries is simply a representation of the experience of Dr. Ghulam Siddiq. With this many procedures done it can be said that Dr. Ghulam Siddiq must be the number one priority for procedures and consultation."
          image={surgery}
        />
      </div>
    </div>
  );
};

export default Distinctions;
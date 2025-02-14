import React from 'react';
import './Distinctions.css';
import VerticalCard from '../../common/VeriticalCard/VerticalCard';

import award from "../../../assets/images/distinctions/1.jpeg";
import surgery from "../../../assets/images/distinctions/oxford1.png";


// Distinctions Component
const Distinctions = () => {
  return (
    <div className="distinctions-container">
      <div className="distinctions-header">
        <h2 className="distinctions-title">A shining legacy in endoscopic surgery</h2>
      </div>
      <div className="distinctions-cards">
        <VerticalCard
          title="Presidential Award for Surgical Excellence"
          description=" Dr. Ghulam Siddiq has been honored with the highly prestigious Presidential Award for Surgical Excellence, a testament to his exceptional skills, dedication, and groundbreaking contributions to the field of medical science. 
 
            His commitment to patient care and his ability to perform complex procedures with precision have earned him respect and admiration from colleagues and patients alike. The Presidential Award is a reflection of his tireless work ethic, dedication to excellence, and relentless pursuit of perfection in the operating room."
          image={award}
          link="#"
        />
        <VerticalCard
          title="Internationally renowned in Endoscopic Surgery"
          description="With an impressive record of 970 Bariatric surgery procedures, Dr. Siddiq stands as a pioneering figure in metabolic and weight-loss surgical interventions. His extensive experience demonstrates not just technical proficiency, but a commitment to transforming patient lives through advanced surgical solutions."
          image={surgery}
          link="#"
        />
      </div>
    </div>
  );
};

export default Distinctions;
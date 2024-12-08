import React from "react";
import about1 from "../../assets/images/about1.jpg";
import experience from "../../assets/images/experience.jpg";
import "./Robotic.css";

const Robotic = () => {
  return (
    <div className="experience-container">
      <div className="experience-card">
        <div className="experience-card-content">
          <div className="experience-card-image">
            <img src={experience} alt="Dr. Ghulam Siddiq" />
          </div>
          <div className="experience-card-text">
            <h2 className="card-title">Dr. Ghulam Siddiq: A Medical Pioneer</h2>
            <p className="card-description">
              With an illustrious career spanning nearly four decades, Dr. Ghulam Siddiq stands as a distinguished surgeon, consultant, and professor at Shifa International Hospital in Islamabad. His profound expertise spans multiple medical disciplines, with a particular emphasis on advanced surgical techniques and patient-centered care.
            </p>
            <p className="card-description">
              As a leading figure in the medical community, Dr. Siddiq has consistently pushed the boundaries of surgical innovation, bringing cutting-edge medical practices to Pakistan and transforming patient outcomes through his meticulous approach and extensive knowledge.
            </p>
            <div className="card-action">
              <a href="/about" className="learn-more-button">
                Learn More About Dr. Siddiq
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="experience-card reverse">
        <div className="experience-card-content">
          <div className="experience-card-image">
            <img src={about1} alt="Dr. Ghulam Siddiq Experience" />
          </div>
          <div className="experience-card-text">
            <h2 className="card-title">Pioneering Surgical Excellence</h2>
            <p className="card-description">
              With an extraordinary career spanning 38 years, Dr. Ghulam Siddiq has established himself as a trailblazer in surgical medicine, particularly in the realm of Laparoscopic Bariatric Surgery. His groundbreaking work has not only advanced medical practices in Pakistan but has also significantly improved patient care and surgical outcomes.
            </p>
            <p className="card-description">
              Recognized for his unparalleled expertise and commitment to medical excellence, Dr. Siddiq has received numerous accolades from peers and patients alike. His approach combines advanced technical skills with compassionate patient care, making him a respected figure in the medical community.
            </p>
            <div className="card-action">
              <a href="/experience" className="learn-more-button">
                Explore Professional Journey
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Robotic;
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
            <img src={about1} alt="Dr. Ghulam Siddiq" />
          </div>
          <div className="experience-card-text">
            <p className="card-title">About Dr. Ghulam Siddiq</p>
            <p className="card-description">
              Dr Ghulam Siddiq is a Surgeon, Consultant and Professor at Shifa International Hospital Islamabad. He is offering his services in various of his specialites More details are available on About page.
            </p>
            <div className="card-action">
              <div className="learn-more-button">
                Learn More
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="experience-card reverse">
        <div className="experience-card-content">
          <div className="experience-card-image">
            <img src={experience} alt="Dr. Ghulam Siddiq Experience" />
          </div>
          <div className="experience-card-text">
            <p className="card-title">Experience</p>
            <p className="card-description">
              Dr. Ghulam Siddiq is working in his field with an experience of about 38 Years and he is a pioneer of Laparoscopic Bariatic surgery in Pakistan. Testimonials can confirm about his diligence.
            </p>
            <div className="card-action">
              <div className="learn-more-button">
                Learn More
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Robotic;
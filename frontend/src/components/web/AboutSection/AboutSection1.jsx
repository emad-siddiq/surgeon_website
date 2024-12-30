import React from "react";
import Card from "../../web/AboutSection/Card";
import experience from "../../../assets/images/experience.jpg";
import "./AboutSection.css";

const AboutSection1 = () => (
  <div className="about-section-container">
    <Card
      image={experience}
      altText="Dr. Ghulam Siddiq"
      title="Dr. Ghulam Siddiq"
      credentials={`M.B.B.S. Khyber Medical College
      Fellow of the Royal College of Surgeons (FRCS)`}
      description={`Dr. Ghulam Siddiq is currently the Chief of Surgery at Shifa International Hospital in Islamabad, Pakistan, where he has been practicing for the last 25 years, specializing in Laparoscopic Bariatric Surgery, a state-of-the-art, minimally invasive surgical technique.`}
      actionLink="/about"
      actionText="Learn more about Dr. Siddiq"
    />
  </div>
);

export default AboutSection1;

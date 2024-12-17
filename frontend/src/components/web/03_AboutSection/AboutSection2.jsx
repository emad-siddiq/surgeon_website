import React from "react";
import Card from "../../web/03_AboutSection/Card";
import about1 from "../../../assets/images/about1.jpg";
import "./AboutSection.css";

const AboutSection2 = () => (
  <div className="about-section-container">
    <Card
      image={about1}
      altText="Dr. Ghulam Siddiq Experience"
      title="Bariatric Surgery"
      credentials={`A novel solution for obesity`}
      description={`With a career spanning 38 years, Dr. Ghulam Siddiq is currently the Chief of Surgery at Shifa International Hospital, Islamabad. He has established himself as a trailblazer in surgical medicine, particularly in the realm of Laparoscopic Bariatric Surgery. His groundbreaking work has advanced medical practices in Pakistan and significantly improved patient care and surgical outcomes.`}
      actionLink="/experience"
      actionText="Explore Professional Journey"
    />
  </div>
);

export default AboutSection2;

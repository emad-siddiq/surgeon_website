import React from "react";
import HorizontalCard from "../../common/HorizontalCard/HorizontalCard";
import experience from "../../../assets/images/experience.jpg";
import "./AboutSection.css";

const AboutSection1 = () => (
  <div className="about-section-container">
    <HorizontalCard
      image={experience}
      altText="Dr. Ghulam Siddiq"
      title="Dr. Ghulam Siddiq"
  credentials={`M.B.B.S. Khyber Medical College
    Fellow of the Royal College of Surgeons (FRCS)`}
  paragraphs={[
    "Dr. Ghulam Siddiq is currently the Chief of Surgery at Shifa International Hospital in Islamabad, Pakistan, where he has been practicing for the last 25 years, specializing in Laparoscopic Bariatric Surgery, a state-of-the-art, minimally invasive surgical technique.",

    "He routinely performs laparascopic Roux en y gastric bypasses, Sleeve Gastrectomies, Mini gastric bypasses (OAGB) and revision bariatric procedures.",
  ]}
  gaps={["20px", "10px", "1px"]} // 10px between first and second, 20px between second and third, 30px after last
  actionLink="#"
  actionText="Learn More"
/>
  </div>
);

export default AboutSection1;


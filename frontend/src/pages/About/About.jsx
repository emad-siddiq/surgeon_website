import React from 'react';
import AboutSection1 from '../../components/web/AboutSection/AboutSection1';
import AboutSection2 from '../../components/web/AboutSection/AboutSection2';
import BeforeAfter from '../../components/web/BeforeAfter/Before_After';
import Distinctions from '../../components/web/Distinctions/Distinctions';
import Gallery from '../../components/web/Gallery/Gallery';
import Footer from '../../components/web/Footer/Footer';
import './About.css';

const About = () => {
  return (
    <div className="about-page-wrapper">
      <div className="about-page-content">
        <div className="about-main-section">
          <AboutSection1 />
          <AboutSection2 />
        </div>
        
        <div className="about-gallery-section">
          <BeforeAfter />
          <Gallery />
        </div>
        
        <div className="about-distinctions-section">
          <Distinctions />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
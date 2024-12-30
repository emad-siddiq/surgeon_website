import React from 'react';
import AboutSection1 from '../../components/web/03_AboutSection/AboutSection1';
import AboutSection2 from '../../components/web/03_AboutSection/AboutSection2';
import BeforeAfterComponent from '../../components/web/04_BeforeAfter/Before_After';
import Distinctions from '../../components/web/07_Distinctions/Distinctions';
import Gallery from '../../components/web/09_Gallery/Gallery';
import Footer from '../../components/web/10_Footer/Footer';
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
          <BeforeAfterComponent />
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
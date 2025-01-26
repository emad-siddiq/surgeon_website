import React, { useEffect, useState } from 'react';
import Footer from '../../components/web/Footer/Footer';
import MobileLogo from '../../components/mobile/MobileLogo/MobileLogo';
import MobileSidebar from '../../components/mobile/MobileSidebar/MobileSidebar';
import HoverNavBar from '../../components/web/HoverNavBar/HoverNavBar';
import hero_image from "../../assets/images/main-slider/1.jpeg";
import video from '../../assets/videos/shifa-video.mp4';

import './About.css';

const About = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="about-container">
      {isMobile ? (
        <>
          <MobileLogo />
          <MobileSidebar />
        </>
      ) : (
        <>
          <HoverNavBar />
        </>
      )}

      <div className="content-wrapper">
        <section className="content-section">
          <div className="hero-content-container">
            <img
              src={hero_image}
              alt="Hero Dr. Ghulam Siddiq"
              className="hero-image"
            />
            <div className="hero-content slide-up">
              <h1>Dr. Ghulam Siddiq</h1>
              <p className="subtitle">Board Certified Bariatric Surgeon</p>
            </div>
            <div className="video-container">
              <video className="youtube-video" controls muted autoPlay>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div className="content-box">
            <h2>About Dr. Siddiq</h2>
            <p className="about-text">
              Dr. Ghulam Siddiq is a renowned bariatric surgeon with over 25 years of experience
              in weight loss surgery. Gis approach combines cutting-edge surgical techniques with
              comprehensive patient care, ensuring the best possible outcomes for her patients.
              He is passionate about helping individuals achieve their health goals through
              surgical and non-surgical weight loss solutions.
            </p>
            <h2>Education & Training</h2>
            <ul className="content-list">
              <li>Medical Degree - Khyber Medical College</li>
              <li>Residency - Lady Reading Hospital</li>
              <li>Fellowship - Royal College of Surgeons Scotland</li>
              <li>PMDC Certified in General Surgery</li>
            </ul>

            <h2>Expertise</h2>
            <ul className="content-list">
              <li>Minimally Invasive Surgery</li>
              <li>Robotic-Assisted Surgery</li>
              <li>Gastric Bypass Surgery</li>
              <li>Sleeve Gastrectomy</li>
            </ul>

            <h2>Patient Success Stories</h2>
            <div className="testimonial-container">
              <p className="testimonial-text">
                "Dr. Johnson changed my life. Her expertise and caring approach made my weight loss journey successful."
              </p>
              <span className="testimonial-author">- Mary S.</span>
              <p className="testimonial-text">
                "The entire process was smooth and well-explained. I couldn't have asked for a better surgeon."
              </p>
              <span className="testimonial-author">- John D.</span>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
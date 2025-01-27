import React from "react";
import SlideShow from "./../../common/Slideshow/Slideshow";
import BackgroundAnimation from "../../common/Animations/BackgroundAnimation";
import "./Hero.css";

// Slideshow images
import mainImage1 from '../../../assets/images/main-slider/1.jpeg';
import mainImage2 from '../../../assets/images/main-slider/2.jpeg';
import mainImage3 from '../../../assets/images/main-slider/3.jpeg';

const Hero = () => {
  const slideshowImages = [mainImage1, mainImage2, mainImage3];

  return (
    <div className="hero-section">
      {/* Background gradient */}
      <div className="background-gradient" />
      
      {/* Background animation container */}
      <div className="animation-container">
        <BackgroundAnimation />
      </div>
      
      {/* Main content */}
      <div className="hero-container">
        <div className="hero-content">
          <div className="heading">
            <h1>Pioneer of Laparoscopic Bariatric Surgery in Pakistan</h1>
          </div>
          <SlideShow className="hero-slideshow" images={slideshowImages} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
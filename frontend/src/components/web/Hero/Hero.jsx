import React from "react";
import SlideShow from "./../../common/Slideshow/Slideshow";
import "./Hero.css";

// Slideshow images
import mainImage1 from '../../../assets/images/main-slider/1.jpeg';
import mainImage2 from '../../../assets/images/main-slider/2.jpeg';
import mainImage3 from '../../../assets/images/main-slider/3.jpeg';

const Hero = () => {
  const slideshowImages = [mainImage1, mainImage2, mainImage3];

  return (
    <div className="hero-container">
      <div className="hero-content">
        <div className="heading">
          <h1>Pioneer of Laparoscopic Bariatric Surgery in Pakistan</h1>
        </div>
        <SlideShow className="hero-slideshow" images={slideshowImages} />
      </div>
    </div>
  );
};

export default Hero;
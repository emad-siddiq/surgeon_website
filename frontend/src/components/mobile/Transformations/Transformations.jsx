import React, { useState, useEffect } from 'react';
import './Transformations.css';
import before_1 from "./../../../assets/images/before_after/before_1.jpg";
import before_2 from "./../../../assets/images/before_after/before_2.jpg";
import after_1 from "./../../../assets/images/before_after/after_1.jpg";
import after_2 from "./../../../assets/images/before_after/after_2.jpg";

const Transformations = () => {
  const images = [
    { 
      src: before_1, 
      type: 'before',
      description: 'Weight before surgery: 140kg'
    },
    { 
      src: after_1, 
      type: 'after',
      description: 'Weight after surgery: 70kg'
    },
    { 
      src: before_2, 
      type: 'before',
      description: 'Weight before surgery: 150kg'
    },
    { 
      src: after_2, 
      type: 'after',
      description: 'Weight after surgery: 70kg'
    }
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(images.length - 1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState('left');

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevImageIndex(currentImageIndex);
      setIsTransitioning(true);
      setSlideDirection('left');
      
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 1000); // Increased from 600 to 1000ms to match slower CSS transition
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  const currentImage = images[currentImageIndex];
  const prevImage = images[prevImageIndex];

  return (
    <div className="before-after-container">
      <div className={`image-label ${isTransitioning ? 'transitioning' : ''}`}>
        {currentImage.type.toUpperCase()}
      </div>
      
      <div className="image-wrapper">
        <div className={`slide-container ${isTransitioning ? 'sliding-out-' + slideDirection : ''}`}>
          <img 
            src={prevImage.src} 
            alt={prevImage.description} 
            className="transition-image"
          />
        </div>
        
        <div className={`slide-container ${isTransitioning ? 'sliding-in-' + slideDirection : ''}`}>
          <img 
            src={currentImage.src} 
            alt={currentImage.description} 
            className="transition-image"
          />
        </div>
      </div>
      
      <div className={`image-description ${isTransitioning ? 'transitioning' : ''}`}>
        {currentImage.description}
      </div>
    </div>
  );
};

export default Transformations;
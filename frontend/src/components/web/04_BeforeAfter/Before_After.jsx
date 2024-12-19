import React, { useState, useEffect } from 'react';
import './Before_After.css';
import before_1 from "./../../../assets/images/before_after/before_1.jpg"
import before_2 from "./../../../assets/images/before_after/before_2.jpg"
import before_3 from "./../../../assets/images/before_after/before_3.png"
import after_1 from "./../../../assets/images/before_after/after_1.jpg"
import after_2 from "./../../../assets/images/before_after/after_2.jpg"
import after_3 from "./../../../assets/images/before_after/after_3.png"

const BeforeAfterComponent = () => {
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
  const [animationKey, setAnimationKey] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const transitionInterval = setInterval(() => {
      setIsTransitioning(true);
      setAnimationKey((prev) => prev + 1);

      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 2000); // Match the animation duration
    }, 5000); // Adjust the interval for better timing

    return () => clearInterval(transitionInterval);
  }, [images.length]);

  const currentImage = images[currentImageIndex];

  return (
    <div className="before-after-container">
      <div className="image-wrapper" key={animationKey}>
        <div className={`transition-overlay ${isTransitioning ? 'slide-in' : 'slide-out'}`}></div>

        <div className={`image-label-container ${isTransitioning ? 'hide-label' : ''}`}>
          <div className="image-label">
            {currentImage.type === 'before' ? 'BEFORE' : 'AFTER'}
          </div>
        </div>

        <img 
          src={currentImage.src} 
          alt={currentImage.description} 
          className="transition-image"
        />
      </div>
      <div className="image-description">
          {currentImage.description}
              </div>
    </div>
  );
};

export default BeforeAfterComponent;

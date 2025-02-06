// Transformations.jsx
import React, { useState } from 'react';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import './Transformations.css';
import before_1 from "./../../../assets/images/before_after/before_1.jpg";
import before_2 from "./../../../assets/images/before_after/before_2.jpg";
import before_3 from "./../../../assets/images/before_after/before_3.png";
import after_1 from "./../../../assets/images/before_after/after_1.jpg";
import after_2 from "./../../../assets/images/before_after/after_2.jpg";
import after_3 from "./../../../assets/images/before_after/after_3.png";

const Transformations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { before: before_1, after: after_1 },
    { before: before_2, after: after_2 },
    { before: before_3, after: after_3 },
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="transformations-container">
      <div className="slider-content">
        <ReactBeforeSliderComponent
          firstImage={{
            imageUrl: images[currentIndex].before,
            label: 'Before'
          }}
          secondImage={{
            imageUrl: images[currentIndex].after,
            label: 'After'
          }}
          delimiter={{
            color: '#fff',
            width: '4px',
          }}
        />

        <button className="nav-button prev" onClick={handlePrev}>
          <span className="nav-arrow">‹</span>
        </button>
        <button className="nav-button next" onClick={handleNext}>
          <span className="nav-arrow">›</span>
        </button>

        <div className="pagination">
          {images.map((_, index) => (
            <span 
              key={index}
              className={`pagination-bullet ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transformations;
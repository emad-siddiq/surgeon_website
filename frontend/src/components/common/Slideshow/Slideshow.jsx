import React, { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import './Slideshow.css';

register();

const Slideshow = ({ className, images }) => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    const swiperContainer = swiperElRef.current;
    
    if (swiperContainer) {
      swiperContainer.autoplay = {
        delay: 3000,
        disableOnInteraction: false
      };
      swiperContainer.loop = true;
      swiperContainer.pagination = true;
      swiperContainer.slidesPerView = 1;
      swiperContainer.speed = 3000;
    }
  }, []);

  return (
    <div className={`slideshow-container ${className}`}>
      <swiper-container 
        ref={swiperElRef}
        autoplay="true"
        loop="true"
      >
        {images.map((image, index) => (
          <swiper-slide key={index}>
            <div 
              className="main-image" 
              style={{backgroundImage: `url(${image})`}}
            ></div>
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
};

export default Slideshow;
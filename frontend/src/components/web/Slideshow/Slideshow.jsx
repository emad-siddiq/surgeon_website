import React, { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import mainImage1 from '../../../assets/images/main-slider/1.jpeg';
import mainImage3 from '../../../assets/images/main-slider/2.jpeg';
import mainImage4 from '../../../assets/images/main-slider/3.jpeg';
import './Slideshow.css';

register();

const SlideShow = () => {
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
      swiperContainer.speed = 1500;
    }
  }, []);

  return (
    <div className="container text-center mt-5">
      <swiper-container 
        ref={swiperElRef}
        autoplay="true"
        loop="true"
      >
        <swiper-slide>
          <div 
            className="main-image" 
            style={{backgroundImage: `url(${mainImage1})`}}
          ></div>
        </swiper-slide>
        <swiper-slide>
          <div 
            className="main-image" 
            style={{backgroundImage: `url(${mainImage3})`}}
          ></div>
        </swiper-slide>
        <swiper-slide>
          <div 
            className="main-image" 
            style={{backgroundImage: `url(${mainImage4})`}}
          ></div>
        </swiper-slide>
      </swiper-container>
    </div>
  );
};

export default SlideShow;

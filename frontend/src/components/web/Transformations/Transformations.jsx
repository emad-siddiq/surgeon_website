import React, { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import 'swiper/css';
import './Transformations.css';
import before_1 from "./../../../assets/images/before_after/before_1.jpg";
import before_2 from "./../../../assets/images/before_after/before_2.jpg";
import before_3 from "./../../../assets/images/before_after/before_3.png";
import after_1 from "./../../../assets/images/before_after/after_1.jpg";
import after_2 from "./../../../assets/images/before_after/after_2.jpg";
import after_3 from "./../../../assets/images/before_after/after_3.png";

register();

const Transformations = () => {
  const swiperElRef = useRef(null);

  const images = [
    { before: before_1, after: after_1 },
    { before: before_2, after: after_2 },
    { before: before_3, after: after_3 },
  ];

  useEffect(() => {
    const swiperContainer = swiperElRef.current;

    if (swiperContainer) {
      swiperContainer.autoplay = {
        delay: 3000,
        disableOnInteraction: false,
      };
      swiperContainer.loop = true;
      swiperContainer.pagination = true;
      swiperContainer.navigation = true;
      swiperContainer.slidesPerView = 1;
      swiperContainer.speed = 1500;
    }
  }, []);

  return (
    <div className="before-after-container">
      <div className="before-after-header">
        <h2 className="before-after-title">Transformations</h2>
      </div>
      <swiper-container ref={swiperElRef} autoplay="true" loop="true">
        {images.map((image, index) => (
          <swiper-slide key={index}>
            <div className="before-after-images">
              <div className="before-image-container">
                <div className="image-title">Before</div>
                <div
                  className="image"
                  style={{ backgroundImage: `url(${image.before})` }}
                />
              </div>
              <div className="after-image-container">
                <div className="image-title">After</div>
                <div
                  className="image"
                  style={{ backgroundImage: `url(${image.after})` }}
                />
              </div>
            </div>
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
};

export default Transformations;

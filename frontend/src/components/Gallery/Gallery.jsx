import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Gallery.css";

// Gallery images
import gallery1 from "../../assets/images/gallery/1.jpg";
import gallery2 from "../../assets/images/gallery/2.jpg";
import gallery3 from "../../assets/images/gallery/3.jpg";
import gallery4 from "../../assets/images/gallery/4.jpg";
import gallery5 from "../../assets/images/gallery/5.jpg";
import gallery6 from "../../assets/images/gallery/6.jpg";
import gallery7 from "../../assets/images/gallery/7.jpg";
import gallery8 from "../../assets/images/gallery/8.jpg";
import gallery9 from "../../assets/images/gallery/9.jpg";
import gallery10 from "../../assets/images/gallery/10.jpeg";
import gallery11 from "../../assets/images/gallery/11.jpeg";
import gallery12 from "../../assets/images/gallery/12.jpeg";
import gallery13 from "../../assets/images/gallery/13.jpeg";
import gallery14 from "../../assets/images/gallery/14.jpeg";
import gallery15 from "../../assets/images/gallery/15.jpeg";

const Gallery = () => {
  return (
    <div className="gallery-container">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={4}
        loop={true}
        autoplay={{
          delay: 1000, // Increased delay from 3000 to 5000ms (5 seconds)
          disableOnInteraction: false,
        }}
        speed={2000} // Transition speed (slower slide change)
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
      >
        {[gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, 
          gallery8, gallery9, gallery10, gallery11, gallery12, gallery13, gallery14, gallery15].map((image, index) => (
          <SwiperSlide key={index}>
            <div className="gallery-slide-wrapper">
              <img src={image} alt={`Gallery ${index + 1}`} className="gallery-image" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
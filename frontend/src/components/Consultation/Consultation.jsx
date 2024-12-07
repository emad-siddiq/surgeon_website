import React from 'react';
import video from '../../assets/videos/shifa-video.mp4';
import './Consultation.css';

const Consultation = ({ videoSrc }) => {
  return (
    <div className="consultation-container">
      <p className="consultation-title">Looking for a consultation?</p>
      <div className="button-container">
        <a href="/contact" className="book-appointment-btn">
          Book an Appointment
        </a>
      </div>
      <div className="video-container">
        <video className="youtube-video" controls muted autoPlay>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Consultation;
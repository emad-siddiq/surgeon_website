import React from 'react';
import VideoPlayer from './../../common/VideoPlayer/VideoPlayer';
import video from '../../../assets/videos/shifa-video.mp4';
import './Consultation.css';

const Consultation = () => {
  return (
    <div className="consultation-container">
      <p className="consultation-title">Looking for a consultation?</p>
      <div className="button-container">
        <a href="/contact" className="book-appointment-btn">
          Book an Appointment
        </a>
      </div>
      <div className="video-container">
        <VideoPlayer 
          videoSrc={video} 
          className="youtube-video-container"
          loop={true}
        />
      </div>
    </div>
  );
};

export default Consultation;
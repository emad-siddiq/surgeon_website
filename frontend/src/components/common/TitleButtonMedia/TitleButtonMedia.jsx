import React, { useRef, useState } from 'react';
import video from '../../../assets/videos/shifa-video.mp4';
import './Consultation.css';

const Consultation = ({ title, buttonText, videoSrc }) => {
  const videoRef = useRef(null);
  const [showControls, setShowControls] = useState(false);

  const handleInteraction = () => {
    setShowControls(!showControls);
  };

  const handleVideoEnd = () => {
    setShowControls(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="consultation-container">
      <p className="consultation-title">{title}</p>
      <div className="button-container">
        <a href="/contact" className="book-appointment-btn">
          {buttonText}
        </a>
      </div>
      <div className="video-container">
        <video
          className="youtube-video"
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          controls={showControls}
          onClick={handleInteraction}
          onEnded={handleVideoEnd}
          style={{ outline: 'none', cursor: 'pointer' }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Consultation;
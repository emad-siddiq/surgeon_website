// Location.jsx
import React from 'react';
import './Location.css';
import shifa from '../../../assets/images/shifa.jpeg';
import video from "../../../assets/videos/shifa.mp4"

const Location = () => {
  return (
    <div className="hospital-location-container">
      <h2 className="hospital-location-heading">Visit Shifa International Hospital</h2>
      <div className="hospital-location-image-container">
      <div className="hospital-video">
        <video className="youtube-video" controls muted autoPlay>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
        <div className="hospital-location-map-overlay">
          <iframe
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAWsBN5V049bS1UtF1_H7QONaL7kyhPMZU&q=Shifa+International+Hospital,+Islamabad"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Location;
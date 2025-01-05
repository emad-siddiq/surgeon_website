import React from 'react';
import './Location.css';
import video from "../../../assets/videos/shifa.mp4";

const Location = () => {
  return (
    <div className="location-container">
      <h2 className="location-heading">Visit Shifa International Hospital</h2>
      <div className="location-content">
        <div className="location-info">
          <h2 className="location-title">Shifa International Hospitals: Setting Standards in Healthcare Excellence</h2>
          <p className="location-description">
            Visit Shifa International Hospital, where excellence meets compassion in healthcare. 
            Our state-of-the-art facility combines cutting-edge medical technology with expert healthcare 
            professionals to deliver outstanding patient care. Located in the heart of Islamabad, 
            we're easily accessible and committed to serving our community with world-class medical services.
            With decades of experience and a patient-first approach, we continue to set new standards 
            in healthcare excellence across Pakistan.
          </p>
        </div>
        <div className="location-media">
          <div className="video-wrapper">
            <video className="location-video" controls muted autoPlay>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="map-wrapper">
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
    </div>
  );
};

export default Location;
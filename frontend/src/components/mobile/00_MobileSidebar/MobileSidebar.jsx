import React, { useState } from "react";
import "./MobileSidebar.css";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="mobile-sidebar">
      

      <button className="menu-button" onClick={toggleSidebar}>
        ☰
      </button>

      {isOpen && (
        <div className="sidebar-overlay">
          <div className="sidebar-content">
            <TopNavItems />
            <ServiceOfferings />
          </div>
        </div>
      )}
    </div>
  );
};

const TopNavItems = () => (
  <div className="nav-links">
    <div>Book Appointment</div>
    <div>Testimonials</div>
    <div>FAQs</div>
  </div>
);

const ServiceOfferings = () => (
  <div className="services">
    <div className="service-item">Gall Bladder Surgery</div>
    <div className="service-item">Appendix Surgery</div>
    <div className="service-item">Laparoscopic Surgery</div>
    <div className="service-item">Colon Surgery</div>
  </div>
);

export default MobileSidebar;

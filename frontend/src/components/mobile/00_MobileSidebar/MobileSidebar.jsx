import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./MobileSidebar.css";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null); // Reference for the sidebar

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  // Close the sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    // Add event listener when sidebar is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="mobile-sidebar">
      <button className="menu-button" onClick={toggleSidebar}>
        ☰
      </button>

      {isOpen && (
        <div className="sidebar-overlay">
          <div className="sidebar-content" ref={sidebarRef}>
            <TopNavItems closeSidebar={closeSidebar} />
            <ServiceOfferings closeSidebar={closeSidebar} />
          </div>
        </div>
      )}
    </div>
  );
};

const TopNavItems = ({ closeSidebar }) => (
  <div className="nav-links">
    <Link to="/book-appointment" className="nav-link" onClick={closeSidebar}>
      Book Appointment
    </Link>
    <Link to="/testimonials" className="nav-link" onClick={closeSidebar}>
      Testimonials
    </Link>
    <Link to="/faqs" className="nav-link" onClick={closeSidebar}>
      FAQs
    </Link>
  </div>
);

const ServiceOfferings = ({ closeSidebar }) => (
  <div className="services">
    <Link
      to="/services/gall-bladder-surgery"
      className="service-item"
      onClick={closeSidebar}
    >
      Gall Bladder Surgery
    </Link>
    <Link
      to="/services/appendix-surgery"
      className="service-item"
      onClick={closeSidebar}
    >
      Appendix Surgery
    </Link>
    <Link
      to="/services/laparoscopic-surgery"
      className="service-item"
      onClick={closeSidebar}
    >
      Laparoscopic Surgery
    </Link>
    <Link
      to="/services/colon-surgery"
      className="service-item"
      onClick={closeSidebar}
    >
      Colon Surgery
    </Link>
  </div>
);

export default MobileSidebar;

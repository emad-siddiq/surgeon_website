import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./MobileSidebar.css";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null); // Reference for the sidebar
  const menuButtonRef = useRef(null); // Reference for the menu button

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Close the sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close sidebar if the click is outside the sidebar or menu button
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !menuButtonRef.current.contains(event.target)) {
        setIsOpen(false);
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
      <button
        className="menu-button"
        onClick={toggleSidebar} // Toggle sidebar when clicked
        ref={menuButtonRef} // Attach the reference to the menu button
      >
        ☰
      </button>

      {isOpen && (
        <div className="sidebar-overlay">
          <div className="sidebar-content" ref={sidebarRef}>
            <TopNavItems closeSidebar={() => setIsOpen(false)} />
            <ServiceOfferings closeSidebar={() => setIsOpen(false)} />
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

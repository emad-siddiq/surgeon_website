import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HoverNavBar.css';
import logo from "./../../../assets/logo.png";

const HoverNavBar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const menuItems = [
    {
      label: 'About',
      path: '/about',
      dropdown: [
        { label: 'Consultation', path: '/about/consultation' },
        { label: 'Follow-up', path: '/about/follow-up' },
        { label: 'Specialized Services', path: '/about/specialized-services' },
      ],
    },
    {
      label: 'Specialities',
      path: '/specialities',
      dropdown: [
        { label: 'Client Stories', path: '/specialities/client-stories' },
        { label: 'Success Cases', path: '/specialities/success-cases' },
        { label: 'Reviews', path: '/specialities/reviews' },
      ],
    },
    {
      label: 'Contact',
      path: '/contact',
      dropdown: [
        { label: 'General Questions', path: '/contact/general-questions' },
        { label: 'Service-specific', path: '/contact/service-specific' },
        { label: 'Pricing Inquiries', path: '/contact/pricing-inquiries' },
      ],
    },
    {
      label: 'Blog',
      path: '/blog',
      dropdown: [],
    },
  ];

  const navItems = [
    { label: 'Book Appointment', path: '/book-appointment' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'FAQs', path: '/faqs' },
  ];

  return (
    <div className="hover-navbar">
      <div className="navbar">
        <Logo />
        <div className="navbar-links">
          {navItems.map((item, index) => (
            <Link key={index} to={item.path} className="navbar-link">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="hoverbar-menu">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="menu-item"
            onMouseEnter={() => setActiveMenu(index)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <Link to={item.path} className="menu-link">
              {item.label}
            </Link>
            {activeMenu === index && item.dropdown.length > 0 && (
              <div className="dropdown-menu">
                {item.dropdown.map((dropdownItem, dropIndex) => (
                  <Link
                    key={dropIndex}
                    to={dropdownItem.path}
                    className="dropdown-item"
                  >
                    {dropdownItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Logo = () => (
  <div className="logo">
    <Link to="/" className="logo-link">
      <img src={logo} alt="Logo" className="logo-img" />
    </Link>
  </div>
);

export default HoverNavBar;

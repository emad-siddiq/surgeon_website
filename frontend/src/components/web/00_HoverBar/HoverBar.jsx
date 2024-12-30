import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HoverBar.css';

const HoverBar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const menuItems = [
    {
      label: 'About',
      path: '/about',
      dropdown: [
        { label: 'Consultation', path: '/about/consultation' },
        { label: 'Follow-up', path: '/about/follow-up' },
        { label: 'Specialized Services', path: '/about/specialized-services' }
      ]
    },
    {
      label: 'Specialities',
      path: '/specialities',
      dropdown: [
        { label: 'Client Stories', path: '/specialities/client-stories' },
        { label: 'Success Cases', path: '/specialities/success-cases' },
        { label: 'Reviews', path: '/specialities/reviews' }
      ]
    },
    {
      label: 'Contact',
      path: '/contact',
      dropdown: [
        { label: 'General Questions', path: '/contact/general-questions' },
        { label: 'Service-specific', path: '/contact/service-specific' },
        { label: 'Pricing Inquiries', path: '/contact/pricing-inquiries' }
      ]
    },
    {
      label: 'Blog',
      path: '/blog',
      dropdown: []
    }
  ];

  return (
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
  );
};

export default HoverBar;

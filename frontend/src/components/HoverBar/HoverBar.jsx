import React, { useState } from 'react';
import './HoverBar.css';

const HoverNavItems = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const menuItems = [
    {
      label: 'About',
      dropdown: [
        'Consultation',
        'Follow-up',
        'Specialized Services'
      ]
    },
    {
      label: 'Specialities',
      dropdown: [
        'Client Stories',
        'Success Cases',
        'Reviews'
      ]
    },
    {
      label: 'Contact',
      dropdown: [
        'General Questions',
        'Service-specific',
        'Pricing Inquiries'
      ]
    },
    {
      label: 'Blog',
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
          {item.label}
          {activeMenu === index && (
            <div className="dropdown-menu">
              {item.dropdown.map((dropdownItem, dropIndex) => (
                <div key={dropIndex} className="dropdown-item">
                  {dropdownItem}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HoverNavItems;
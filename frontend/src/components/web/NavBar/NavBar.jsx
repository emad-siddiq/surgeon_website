import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from "./../../../assets/logo.png";

const NavBar = () => {
  return (
    <div className="navbar">
      <Logo />
      <TopNavItems />
    </div>
  );
};

const Logo = () => {
  return (
    <div className="logo">
      <Link to="/" className="logo-link">
        <img src={logo} alt="Logo" className="logo-img" />
      </Link>
    </div>
  );
};

const TopNavItems = () => {
  const navItems = [
    { label: 'Book Appointment', path: '/book-appointment' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'FAQs', path: '/faqs' },
  ];

  return (
    <div className="navbar-links">
      {navItems.map((item, index) => (
        <Link key={index} to={item.path} className="navbar-link">
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default NavBar;

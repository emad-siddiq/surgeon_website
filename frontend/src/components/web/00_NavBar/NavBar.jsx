import React from 'react';
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
      <img
        src={logo}
        alt="Logo"
        className="logo-img"
      />
    </div>
  );
};

const TopNavItems = () => {
  return (
    <div className="navbar-links">
      <div>Book Appointment</div>
      <div>Testimonials</div>
      <div>FAQs</div>
    </div>
  );
};

export default NavBar;

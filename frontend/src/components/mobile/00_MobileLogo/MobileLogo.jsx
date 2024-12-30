import React from "react";
import { Link } from "react-router-dom";
import "./MobileLogo.css";
import logo from "./../../../assets/logo.png";

const MobileLogo = () => {
  return (
    <div className="logo-container">
      <Link to="/" className="logo-link">
        <img src={logo} alt="Logo" className="logo-image" />
      </Link>
    </div>
  );
};

export default MobileLogo;

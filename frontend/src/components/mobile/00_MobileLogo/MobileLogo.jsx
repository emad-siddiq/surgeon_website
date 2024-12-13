import React from "react";
import "./MobileLogo.css";
import logo from "./../../../assets/logo.png";

const MobileLogo = () => {
  return (
    <div className="logo-container">
      <img src={logo} alt="Logo" className="logo-image" />
    </div>
  );
};

export default MobileLogo;

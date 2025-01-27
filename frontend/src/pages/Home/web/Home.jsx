// Home.jsx
import React from 'react';

/* Mobile specific components */
import MobileLogo from "./../../../components/mobile/MobileLogo/MobileLogo";
import MobileSidebar from "./../../../components/mobile/MobileSidebar/MobileSidebar";

/* Web specific components */
import HoverNavBar from "../../../components/web/HoverNavBar/HoverNavBar";
import Hero from './../../../components/web/Hero/Hero';
import AboutSection1 from './../../../components/web/AboutSection/AboutSection1';
import AboutSection2 from './../../../components/web/AboutSection/AboutSection2';
import Consultation from './../../../components/web/Consultation/Consultation';
import ServiceOfferings from './../../../components/web/ServiceOfferings/ServiceOfferings';
import Distinctions from './../../../components/web/Distinctions/Distinctions';
import Location from './../../../components/web/Location/Location';
import Gallery from './../../../components/web/Gallery/Gallery';
import Footer from './../../../components/web/Footer/Footer';
import Transformations from './../../../components/web/Transformations/Transformations';

import "./Home.css";
import BackgroundAnimation from '../../../components/common/Animations/BackgroundAnimation';

const Home = ({ isMobile }) => {
  return (
    <div>
      {isMobile ? (
        // Mobile view
        <>
          <MobileLogo />
          <MobileSidebar />
          <Hero />
        </>
      ) : (
        // Desktop view
        <div className="hero-nav">
          <HoverNavBar />
          <Hero />
        </div>
      )}
      <BackgroundAnimation/>
      <AboutSection1 />
      <Consultation />
      <AboutSection2 />
      <Transformations />
      <ServiceOfferings />
      <Distinctions />
      <Location />
      <Gallery />
      <Footer />
    </div>
  );
};

export default Home;

// Home.jsx
import React from 'react';

/* Mobile specific components */
import MobileLogo from "./../../../components/mobile/MobileLogo/MobileLogo";
import MobileSidebar from "./../../../components/mobile/MobileSidebar/MobileSidebar";

/* Web specific components */
import Hero from './../../../components/web/Hero/Hero';

import AboutSection1 from './../../../components/web/AboutSection/AboutSection1';
import AboutSection2 from './../../../components/web/AboutSection/AboutSection2';
import Consultation from './../../../components/web/Consultation/Consultation';
import ServiceOfferings from './../../../components/web/ServiceOfferings/ServiceOfferings';
import Distinctions from './../../../components/web/Distinctions/Distinctions';
import Location from './../../../components/web/Location/Location';
import Gallery from './../../../components/web/Gallery/Gallery';
import Footer from './../../../components/web/Footer/Footer';
import Transformations from './../../../components/mobile/Transformations/Transformations';

const Home = ({ isMobile }) => {
  return (
    <div>
      
      <MobileLogo />
      <MobileSidebar />

      

      <Hero />
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

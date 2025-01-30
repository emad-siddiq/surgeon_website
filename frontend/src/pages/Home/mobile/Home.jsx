// Home.jsx
import React from 'react';

/* Mobile specific components */
import MobileLogo from "./../../../components/mobile/MobileLogo/MobileLogo";
import MobileSidebar from "./../../../components/mobile/MobileSidebar/MobileSidebar";

/* Web specific components */
import Hero from './../../../components/web/Hero/Hero';

import AboutCard from '../../../components/web/AboutSection/AboutCard';
import BariatricCard from '../../../components/web/BariatricCard/BariatricCard';
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
      <AboutCard />
      <Consultation />
      <BariatricCard />
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

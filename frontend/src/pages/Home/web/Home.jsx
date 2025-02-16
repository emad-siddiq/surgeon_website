// Home.jsx
import React from 'react';

/* Mobile specific components */
import MobileLogo from "./../../../components/mobile/MobileLogo/MobileLogo";
import MobileSidebar from "./../../../components/mobile/MobileSidebar/MobileSidebar";

/* Web specific components */
import HoverNavBar from "../../../components/web/HoverNavBar/HoverNavBar";
import Hero from './../../../components/web/Hero/Hero';
import AboutCard from '../../../components/web/AboutSection/AboutCard';
import BariatricCard from './../../../components/web/BariatricCard/BariatricCard';
import Consultation from './../../../components/web/Consultation/Consultation';
import ServiceOfferings from './../../../components/web/ServiceOfferings/ServiceOfferings';
import Distinctions from './../../../components/web/Distinctions/Distinctions';
import Location from './../../../components/web/Location/Location';
import Gallery from './../../../components/web/Gallery/Gallery';
import Footer from './../../../components/web/Footer/Footer';
import Transformations from './../../../components/web/Transformations/Transformations';
import LineGrid from '../../../components/common/Animations/NetworkGraph';
import "./Home.css";
import AnimationGrid from '../../../components/common/Animations/AnimationGrid';
import { Line } from 'three';
import NetworkVisualization from '../../../components/common/Animations/NetworkGraph';


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
      <NetworkVisualization/>

      <div className="content">
      <AboutCard />
      <Consultation />
      <ServiceOfferings />
      <BariatricCard />
      <Transformations />
      <Distinctions />
      <Location />
      <Gallery />
      </div>
      <Footer />
    </div>
  );
};

export default Home;

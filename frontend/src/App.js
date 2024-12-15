import React, { useState, useEffect } from 'react';

/* Mobile specific components */
import MobileLogo from "./components/mobile/00_MobileLogo/MobileLogo"
import MobileSidebar from "./components/mobile/00_MobileSidebar/MobileSidebar"

/* Web specific components */
import HoverBar from "./components/web/00_HoverBar/HoverBar"
import NavBar from './components/web/00_NavBar/NavBar';
import Heading from './components/web/01_Heading/Heading';
import SlideShow from './components/web/02_Slideshow/Slideshow'
import AboutSection1 from './components/web/03_AboutSection/AboutSection1';
import AboutSection2 from './components/web/03_AboutSection/AboutSection2';
import Consultation from './components/web/05_Consultation/Consultation';
import ServiceOfferings from './components/web/06_ServiceOfferings/ServiceOfferings';
import Distinctions from './components/web/07_Distinctions/Distinctions';
import Location from './components/web/08_Location/Location';
import Gallery from './components/web/09_Gallery/Gallery';
import Footer from './components/web/10_Footer/Footer';

function App() {
  const [backendStatus, setBackendStatus] = useState('Checking...');
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/health', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setBackendStatus(data.status);
      } catch (err) {
        setBackendStatus('Backend is down');
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initial screen size
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    checkBackendHealth();

    // Cleanup listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="App">
      {isMobile ? (
        // Mobile view
        <>
          <MobileLogo />
          <MobileSidebar />
          <Heading />
          <SlideShow />
          <AboutSection1 />
          <Consultation />
          <AboutSection2 />

          <ServiceOfferings />
          <Distinctions />
          <Location />
          <Gallery />
          <Footer />
    
        </>
      ) : (
        // Desktop view
        <>
          <NavBar />
          <HoverBar />
          <Heading />
          <SlideShow />
          <AboutSection1 />
          <AboutSection2 />
          <Consultation />
          <ServiceOfferings />
          <Distinctions />
          <Location />
          <Gallery />
          <Footer />
        </>
      )}
      
      {/* Uncomment for debugging */}
      {/* <p>Backend Health Status: {backendStatus}</p>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>} */}
    </div>
  );
}

export default App;

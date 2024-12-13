import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar/NavBar';
import HoverNavItems from './components/HoverBar/HoverBar';
import MobileSidebar from './components/MobileSidebar/MobileSidebar';
import MobileLogo from './components/MobileLogo/MobileLogo'; // Import the new MobileLogo component
import Heading from './components/Heading/Heading';
import Gallery from './components/Gallery/Gallery';
import SlideShow from './components/Slideshow/Slideshow';
import Consultation from './components/Consultation/Consultation';
import Distinctions from './components/Distinctions/Distinctions';
import ServiceOfferings from './components/ServiceOfferings/ServiceOfferings';
import AboutSection from './components/AboutSection/AboutSection';
import Footer from './components/Footer/Footer';
import Location from './components/Location/Location';

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
          <AboutSection />
          <Consultation />
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
          <HoverNavItems />
          <Heading />
          <SlideShow />
          <AboutSection />
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

import React, { useState, useEffect } from 'react';
import * as Web from "./components/web/Web";
import * as Mobile from "./components/mobile/Mobile";

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
          <Mobile.MobileLogo />
          <Mobile.MobileSidebar />
          <Mobile.Heading />
          <Mobile.SlideShow />
          <Mobile.AboutSection />
          <Mobile.Consultation />
          <Mobile.ServiceOfferings />
          <Mobile.Distinctions />
          <Mobile.Location />
          <Mobile.Gallery />
          <Mobile.Footer />
    
        </>
      ) : (
        // Desktop view
        <>
          <Web.NavBar />
          <Web.HoverBar />
          <Web.Heading />
          <Web.SlideShow />
          <Web.AboutSection />
          <Web.Consultation />
          <Web.ServiceOfferings />
          <Web.Distinctions />
          <Web.Location />
          <Web.Gallery />
          <Web.Footer />
        </>
      )}
      
      {/* Uncomment for debugging */}
      {/* <p>Backend Health Status: {backendStatus}</p>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>} */}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar/NavBar';
import HoverNavItems from './components/HoverBar/HoverBar';
import Heading from './components/Heading/Heading';
import Gallery from './components/Gallery/Gallery';
import SlideShow from './components/Slideshow/Slideshow';

function App() {
  const [backendStatus, setBackendStatus] = useState('Checking...');
  const [error, setError] = useState(null);

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

    checkBackendHealth();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <HoverNavItems/>
      <Heading/>
      <SlideShow/>
      <Gallery/>
      <p>Backend Health Status: {backendStatus}</p>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}

export default App;

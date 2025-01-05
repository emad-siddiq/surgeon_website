// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Consultation from './components/web/Consultation/Consultation';
import About from './pages/About/About';
import ServiceOfferings from './components/web/ServiceOfferings/ServiceOfferings';
import Location from './components/web/Location/Location';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initial screen size
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isMobile={isMobile} />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServiceOfferings />} />
        <Route path="/location" element={<Location />} />
      </Routes>
    </Router>
  );
}

export default App;

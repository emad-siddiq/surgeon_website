import { Navigate, Route, Routes } from 'react-router-dom';
import { HoverNavBar } from './components/layout/HoverNavBar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <>
      <HoverNavBar />
      <main id="main" className="relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* Legacy bare-section URLs redirect to the matching anchor on Home. */}
          <Route path="/consultation" element={<Navigate to="/#consultation" replace />} />
          <Route path="/services" element={<Navigate to="/#services" replace />} />
          <Route path="/location" element={<Navigate to="/#location" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

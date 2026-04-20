import { Navigate, Route, Routes } from 'react-router-dom';
import { HoverNavBar } from './components/layout/HoverNavBar';
import { Footer } from './components/layout/Footer';
import { BookingFeedbackPrompt } from './components/ui/BookingFeedbackPrompt';
import { useRouteScrollReset } from './hooks/useRouteScrollReset';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Procedures } from './pages/Procedures';
import { Bariatric } from './pages/Bariatric';
import { Distinctions } from './pages/Distinctions';
import { Transformations } from './pages/Transformations';
import { Location } from './pages/Location';
import { Consultation } from './pages/Consultation';
import { Gallery } from './pages/Gallery';
import { NotFound } from './pages/NotFound';

export default function App() {
  useRouteScrollReset();
  return (
    <>
      <HoverNavBar />
      <main id="main" className="relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/procedures" element={<Procedures />} />
          <Route path="/bariatric" element={<Bariatric />} />
          <Route path="/distinctions" element={<Distinctions />} />
          <Route path="/transformations" element={<Transformations />} />
          <Route path="/location" element={<Location />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/gallery" element={<Gallery />} />

          {/* Legacy / common aliases → canonical routes */}
          <Route path="/services" element={<Navigate to="/procedures" replace />} />
          <Route path="/contact" element={<Navigate to="/consultation" replace />} />
          <Route path="/book-appointment" element={<Navigate to="/consultation" replace />} />
          <Route path="/experience" element={<Navigate to="/bariatric" replace />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {/*
        Post-click booking feedback. Renders nothing until the patient
        has clicked WhatsApp / Call and the cool-off window has
        elapsed. Mounted once at the app shell.
      */}
      <BookingFeedbackPrompt />
    </>
  );
}

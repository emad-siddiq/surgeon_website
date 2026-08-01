/**
 * Top-level shell: chrome (HoverNavBar + Footer), the route table, and
 * the always-mounted booking-feedback toast.
 *
 * The route table includes four legacy aliases (`/services`,
 * `/contact`, `/book-appointment`, `/experience`) that <Navigate>-redirect
 * to the canonical paths. `*` falls through to <NotFound>.
 *
 * `BookingFeedbackPrompt` is mounted here, not on /consultation,
 * because a click recorded in a previous session can surface the
 * prompt on whatever page the patient lands on next (within the 24 h
 * TTL — see hooks/useBookingFeedback.ts).
 *
 * `useRouteScrollReset` (defined below) scrolls to the top on every
 * pathname change, deferring to a hash anchor if the URL has one.
 */
import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { HoverNavBar } from './components/layout/HoverNavBar';
import { Footer } from './components/layout/Footer';
import { MobileBookingBar } from './components/layout/MobileBookingBar';
import { BookingFeedbackPrompt } from './components/ui/BookingFeedbackPrompt';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Procedures } from './pages/Procedures';
import { Bariatric } from './pages/Bariatric';
import { Distinctions } from './pages/Distinctions';
import { Teaching } from './pages/Teaching';
import { Transformations } from './pages/Transformations';
import { Location } from './pages/Location';
import { Consultation } from './pages/Consultation';
import { Gallery } from './pages/Gallery';
import { NotFound } from './pages/NotFound';

// Scroll the window to the top on every pathname change. If the URL
// includes a hash (e.g. /#consultation), defer to that anchor instead.
function useRouteScrollReset() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
}

export default function App() {
  useRouteScrollReset();
  return (
    <>
      <HoverNavBar />
      {/* <lg only: keeps WhatsApp + phone one tap away on every route.
          Mounted BEFORE the routed content so the bar's links are the
          first booking anchors in DOM/tab order — position:fixed means
          placement here has no visual effect, but assistive tech and
          the ux-flow above-fold assertions (which take the first
          matching anchor) reach the bar, not the footer. */}
      <MobileBookingBar />
      <main id="main" className="relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/procedures" element={<Procedures />} />
          <Route path="/bariatric" element={<Bariatric />} />
          <Route path="/distinctions" element={<Distinctions />} />
          <Route path="/teaching" element={<Teaching />} />
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

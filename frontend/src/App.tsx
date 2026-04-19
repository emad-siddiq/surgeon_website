import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HoverNavBar } from './components/layout/HoverNavBar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';

const StyleGuide = lazy(() =>
  import('./pages/StyleGuide').then((m) => ({ default: m.StyleGuide })),
);

export default function App() {
  return (
    <>
      <HoverNavBar />
      <main id="main" className="relative">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* Legacy bare-section URLs redirect to the matching anchor on Home. */}
            <Route path="/consultation" element={<Navigate to="/#consultation" replace />} />
            <Route path="/services" element={<Navigate to="/#services" replace />} />
            <Route path="/location" element={<Navigate to="/#location" replace />} />
            {import.meta.env.DEV && <Route path="/styleguide" element={<StyleGuide />} />}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

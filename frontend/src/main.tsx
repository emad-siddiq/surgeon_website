/**
 * React DOM entry point. Mounts <App> inside HelmetProvider (head
 * management for Seo.tsx) and BrowserRouter (react-router-dom v7).
 * Loads index.css, which imports the design-system tokens.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);

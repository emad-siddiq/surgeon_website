import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * When the URL hash changes, scroll the matching anchor into view. Falls back
 * to scroll-to-top for no-hash navigations.
 */
export function useHashScroll() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    const id = hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash, pathname]);
}

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * On every pathname change, scroll the window back to the top. If the URL
 * includes a hash (e.g. `/#consultation`), defer to that anchor.
 */
export function useRouteScrollReset() {
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

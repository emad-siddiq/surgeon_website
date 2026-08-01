/**
 * Reactive media-query hooks.
 *
 * useMediaQuery(query) is the generic primitive: returns a boolean that
 * tracks `window.matchMedia(query)` and updates when it changes. Safe
 * to call on the server (returns false until hydrated).
 *
 * Two preset wrappers are exported:
 *   - useIsMobile() — true at viewports below Tailwind's `lg` (1024px).
 *     This is what HoverNavBar uses to swap to the hamburger layout.
 *   - usePrefersReducedMotion() — honours the OS-level reduced-motion
 *     preference. Used by AnimatedCounter and HeroSlideshow to drop
 *     animations.
 */
import { useEffect, useState } from 'react';

/**
 * Reactive boolean for a CSS media query. Safe to call on the server
 * (returns false until hydrated).
 */
export function useMediaQuery(query: string): boolean {
  const get = () =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia(query).matches
      : false;

  const [matches, setMatches] = useState(get);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// Mobile covers everything below Tailwind's `lg` breakpoint so the
// hamburger menu appears whenever the desktop inline nav would not fit.
// Previously this was `767px`, which left a dead zone at 768–1023px
// where neither the mobile trigger nor the desktop links rendered.
export const useIsMobile = () => useMediaQuery('(max-width: 1023px)');
export const usePrefersReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)');

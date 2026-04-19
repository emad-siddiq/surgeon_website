import { useEffect, useState } from 'react';

/**
 * True once the window has scrolled past `threshold` pixels. Used to shift the
 * nav into its "scrolled" visual state per the style guide.
 */
export function useScrolled(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

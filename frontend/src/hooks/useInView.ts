import { useEffect, useRef, useState } from 'react';

/**
 * Returns a ref + a boolean that flips to true the first time the element
 * crosses the viewport. One-shot by default — does not flip back.
 */
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (inView || !ref.current || typeof IntersectionObserver === 'undefined') return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2, ...options },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, options]);
  return { ref, inView } as const;
}

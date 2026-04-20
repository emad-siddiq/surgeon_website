import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/cn';

interface HeroSlideshowProps {
  images: { src: string; alt: string }[];
  /** Milliseconds between slide transitions. */
  interval?: number;
  className?: string;
}

/**
 * Auto-crossfading slideshow of 2–N images. CSS-only transitions; no
 * external carousel library. Pauses automatically when the user prefers
 * reduced motion (shows the first image statically) or when the tab is
 * hidden.
 */
export function HeroSlideshow({ images, interval = 5000, className }: HeroSlideshowProps) {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || images.length < 2) return;
    let paused = document.visibilityState !== 'visible';
    const id = window.setInterval(() => {
      if (!paused) setIndex((i) => (i + 1) % images.length);
    }, interval);
    const onVis = () => {
      paused = document.visibilityState !== 'visible';
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [interval, images.length, reduced]);

  return (
    <div
      className={cn(
        // Landscape on phones (less vertical drag), portrait from md up.
        'relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border1 shadow-card sm:aspect-[5/4] md:aspect-[4/5]',
        className,
      )}
    >
      {images.map((image, i) => (
        <img
          key={image.src}
          src={image.src}
          alt={i === index ? image.alt : ''}
          aria-hidden={i === index ? undefined : 'true'}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-breathe',
            i === index ? 'opacity-100' : 'opacity-0',
          )}
        />
      ))}
    </div>
  );
}

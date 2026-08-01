import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

interface AnimatedCounterProps {
  /** Final value. */
  to: number;
  /** Animation duration in milliseconds. */
  duration?: number;
  /** String appended after the number (e.g. "+", "k", "%"). */
  suffix?: string;
  className?: string;
  'aria-label'?: string;
}

/**
 * Counts from 0 up to `to` over `duration` ms, starting the first time the
 * element enters the viewport. Honors `prefers-reduced-motion` — in that
 * mode it snaps straight to the final value. Uses `requestAnimationFrame`
 * with a linear-out-cubic easing curve so the counter decelerates nicely.
 */
export function AnimatedCounter({
  to,
  duration = 1400,
  suffix = '',
  className,
  ...rest
}: AnimatedCounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(reduced || !inView ? (reduced ? to : 0) : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setValue(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to, duration]);

  return (
    <span ref={ref} className={className} {...rest}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

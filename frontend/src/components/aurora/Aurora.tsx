import { Suspense, lazy } from 'react';
import { useMediaQuery, usePrefersReducedMotion } from '@/hooks/useMediaQuery';

const AuroraCanvas = lazy(() => import('./AuroraCanvas'));

interface AuroraProps {
  /** When true, reduces intensity (used inside the Consultation band). */
  muted?: boolean;
  className?: string;
}

/**
 * Aurora — the ambient "breathing" gradient behind hero and consultation.
 *
 * - Static CSS gradient renders immediately (zero JS cost, satisfies LCP budget).
 * - If the viewport is large, the device has >= 4 logical cores, and the user
 *   has NOT requested reduced motion, a lazy-loaded three.js canvas overlays
 *   it for the signature WebGL treatment.
 * - The canvas is pointer-events: none and aria-hidden, and pauses itself when
 *   the tab is backgrounded (handled inside AuroraCanvas).
 */
export function Aurora({ muted = false, className = '' }: AuroraProps) {
  const reducedMotion = usePrefersReducedMotion();
  const largeEnough = useMediaQuery('(min-width: 641px)');
  const hasCores =
    typeof navigator !== 'undefined' && (navigator.hardwareConcurrency ?? 0) >= 4;
  const allowCanvas = !reducedMotion && largeEnough && hasCores;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity: muted ? 0.55 : 1 }}
    >
      {/* CSS fallback, always present. */}
      <div className="aurora" />
      {allowCanvas ? (
        <Suspense fallback={null}>
          <AuroraCanvas />
        </Suspense>
      ) : null}
    </div>
  );
}

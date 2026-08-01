import { useEffect } from 'react';

/**
 * Lock document.body's scroll while `active` is true. Restores the
 * previous overflow value on unlock.
 *
 * Used by the modal dialog and the mobile navigation drawer so that
 * scrolling the underlying page is impossible while either is open.
 */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import { ButtonLink } from '@/components/ui/Button';
import { contact } from '@/content/contact';
import { recordBookingClick } from '@/hooks/useBookingFeedback';

/**
 * Fixed bottom action bar, <lg viewports only: the practice's two
 * booking channels (WhatsApp + phone) reachable on every route without
 * scrolling — goal-state G2 "above the fold on every route at 390px".
 *
 * Yields to the footer: an IntersectionObserver on `<footer>` fades the
 * bar out (opacity + visibility, so it also leaves the a11y tree and
 * tab order) once the footer — which carries its own contact links —
 * enters the viewport. Same pattern SectionProgress uses for its rail.
 *
 * z-30 keeps it under the BookingFeedbackPrompt toast (z-40) and the
 * MobileSidebar / Modal overlays (z-50).
 */
export function MobileBookingBar() {
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const footer = document.querySelector('footer');
    if (!footer) return;
    const io = new IntersectionObserver((entries) =>
      setNearFooter(entries.some((entry) => entry.isIntersecting)),
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Quick booking actions"
      className={cn(
        'fixed inset-x-0 bottom-0 z-30 border-t border-border1 bg-canvas/95 px-3 pt-2.5 backdrop-blur lg:hidden',
        // Clear the iOS home indicator without doubling padding elsewhere.
        'pb-[calc(0.625rem+env(safe-area-inset-bottom))]',
        'transition-[opacity,visibility] duration-300 ease-breathe motion-reduce:transition-none',
        nearFooter ? 'invisible opacity-0' : 'visible opacity-100',
      )}
    >
      <div className="mx-auto flex max-w-md gap-2.5">
        <ButtonLink
          href={contact.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="sm"
          // Synchronous write — the tab may be torn down before async
          // work runs (see BookingActions for the full rationale).
          onClick={() => recordBookingClick('whatsapp')}
          className="flex-1 bg-[#25D366] hover:bg-[#1fb655]"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor">
            <path d="M20.52 3.48A11.93 11.93 0 0 0 12.02 0C5.43 0 .08 5.35.08 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.27-1.64a11.93 11.93 0 0 0 5.74 1.46h.01c6.59 0 11.94-5.35 11.94-11.94 0-3.19-1.24-6.19-3.44-8.4ZM12.02 21.8h-.01a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.72.98 1-3.62-.23-.37a9.84 9.84 0 0 1-1.51-5.27c0-5.44 4.43-9.86 9.87-9.86 2.64 0 5.11 1.03 6.97 2.89a9.8 9.8 0 0 1 2.89 6.97c0 5.44-4.43 9.86-9.89 9.86Zm5.41-7.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.34.22-.64.07a8.13 8.13 0 0 1-2.39-1.48 9.02 9.02 0 0 1-1.66-2.07c-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.19-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
          </svg>
          WhatsApp
        </ButtonLink>
        <ButtonLink
          href={`tel:${contact.phone.tel}`}
          variant="secondary"
          size="sm"
          onClick={() => recordBookingClick('phone')}
          className="flex-1"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.88.32 1.74.57 2.58a2 2 0 0 1-.45 2.11L8 9.67a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.84.25 1.7.44 2.58.57A2 2 0 0 1 22 16.92Z" />
          </svg>
          Call
        </ButtonLink>
      </div>
    </nav>
  );
}

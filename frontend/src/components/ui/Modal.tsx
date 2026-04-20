import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/cn';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Accessible title shown in the panel header and linked via aria-labelledby. */
  title: ReactNode;
  /** Optional eyebrow label above the title. */
  eyebrow?: ReactNode;
  children?: ReactNode;
  /** Max-width of the content panel. Defaults to 42rem. */
  className?: string;
}

/**
 * Accessible modal dialog. Features:
 *
 *  - `role="dialog"` + `aria-modal="true"` + `aria-labelledby`
 *  - Focus is moved into the panel on open and restored to the trigger
 *    on close.
 *  - Focus trap cycles Tab/Shift-Tab within the panel.
 *  - Escape closes. Backdrop click closes.
 *  - Body scroll is locked while open.
 *  - Rendered via React portal into `document.body` so stacking is not
 *    affected by ancestor `overflow` or `transform` styles.
 */
export function Modal({ open, onClose, title, eyebrow, children, className }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  // Remember the element that was focused when the modal opened, so we
  // can restore focus to it on close.
  useEffect(() => {
    if (!open) return;
    lastFocusedRef.current = (document.activeElement as HTMLElement) ?? null;
    // Move focus into the panel.
    const id = window.setTimeout(() => {
      const el =
        panelRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) ?? panelRef.current;
      el?.focus();
    }, 0);
    return () => {
      window.clearTimeout(id);
      lastFocusedRef.current?.focus?.();
    };
  }, [open]);

  // Keyboard handling: Escape to close, Tab/Shift-Tab to trap focus.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-hidden={!open}
      className={cn(
        'fixed inset-0 z-50 transition-opacity duration-200',
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <div
        role="presentation"
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-textPrimary/50 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        style={{
          // Use dynamic viewport height where supported (iOS Safari) so the
          // panel is never clipped by the collapsing address bar.
          maxHeight: 'calc(100dvh - 1rem)',
        }}
        className={cn(
          // Full-width sheet style on phones (sits flush to bottom edge),
          // centered card on sm+.
          'absolute bottom-0 left-0 right-0 flex flex-col overflow-hidden rounded-t-2xl bg-white shadow-raised',
          'transition-transform duration-200 ease-breathe',
          'sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-[calc(100vw-2rem)] sm:max-w-[42rem] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl',
          open ? 'translate-y-0 sm:scale-100' : 'translate-y-full sm:translate-y-0 sm:scale-95',
          className,
        )}
      >
        <header
          className="flex items-start justify-between gap-3 border-b border-border1 px-5 py-4 sm:gap-4 sm:px-6 sm:py-5 md:px-8"
          style={{ paddingTop: 'max(1rem, env(safe-area-inset-top, 0px))' }}
        >
          <div className="min-w-0">
            {eyebrow ? <p className="t-eyebrow text-primary">{eyebrow}</p> : null}
            <h2 id={titleId} className="t-h2 mt-1">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border1 text-textSecondary hover:border-primary hover:text-primary"
          >
            <svg
              viewBox="0 0 14 14"
              width={14}
              height={14}
              aria-hidden="true"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </header>
        <div
          className="overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8"
          style={{
            paddingBottom:
              'max(1.25rem, calc(1.25rem + env(safe-area-inset-bottom, 0px)))',
          }}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ButtonLink, ButtonRouterLink } from '@/components/ui/Button';
import { primaryNav } from '@/content/nav';
import { contact } from '@/content/contact';
import { cn } from '@/lib/cn';

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Trap focus within the panel, close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const first = panelRef.current?.querySelector<HTMLElement>('a[href]');
    first?.focus();
  }, [open]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!open}
      className={cn(
        'fixed inset-0 z-50 transition-opacity duration-200',
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <div
        className="absolute inset-0 bg-textPrimary/40"
        onClick={onClose}
        role="presentation"
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        id="mobile-nav"
        className={cn(
          'absolute right-0 top-0 flex h-full w-full max-w-xs flex-col bg-white p-8 shadow-raised transition-transform duration-200',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-textPrimary">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border1"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              aria-hidden="true"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>
        <nav aria-label="Primary" className="mt-10">
          <ul className="flex flex-col gap-5">
            {primaryNav.map((item) =>
              item.to.startsWith('/#') ? (
                <li key={item.to}>
                  <a
                    href={item.to.replace('/', '')}
                    className="text-xl text-textPrimary hover:text-primary"
                    onClick={onClose}
                  >
                    {item.label}
                  </a>
                </li>
              ) : (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-xl text-textPrimary hover:text-primary"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="mt-auto flex flex-col gap-3 pt-10">
          <ButtonLink href={`tel:${contact.phone.tel}`} variant="secondary">
            {contact.phone.display}
          </ButtonLink>
          <ButtonRouterLink to="/#consultation" variant="primary" onClick={onClose}>
            Book Appointment
          </ButtonRouterLink>
        </div>
      </div>
    </div>
  );
}

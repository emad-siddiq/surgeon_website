import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ButtonLink, ButtonRouterLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { useScrolled } from '@/hooks/useScrolled';
import { contact } from '@/content/contact';
import { primaryNav } from '@/content/nav';
import { Logo } from './Logo';
import { MobileSidebar } from './MobileSidebar';
import { cn } from '@/lib/cn';

function DesktopNav() {
  return (
    <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
      {primaryNav.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end
          className={({ isActive }) =>
            cn(
              'relative py-1.5 text-sm font-medium transition-colors duration-200',
              'after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:bg-primary',
              'after:transition-transform after:duration-300 after:ease-breathe',
              isActive
                ? 'text-primary after:scale-x-100'
                : 'text-textSecondary after:scale-x-0 hover:text-primary hover:after:scale-x-100',
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export function HoverNavBar() {
  const scrolled = useScrolled(8);
  const location = useLocation();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-[background-color,backdrop-filter,box-shadow,border-color] duration-200',
        scrolled
          ? 'border-b border-border1 bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-white/70 backdrop-blur-sm border-b border-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />
        {isMobile ? (
          <div className="flex items-center gap-2">
            <ButtonLink href={`tel:${contact.phone.tel}`} variant="ghost" size="sm">
              Call
            </ButtonLink>
            <button
              ref={triggerRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border1 bg-white text-textPrimary hover:border-primary hover:text-primary"
            >
              <svg
                width="18"
                height="12"
                viewBox="0 0 18 12"
                aria-hidden="true"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M1 1h16M1 6h16M1 11h16" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <DesktopNav />
            <div className="flex items-center gap-3">
              <ButtonLink
                href={`tel:${contact.phone.tel}`}
                variant="ghost"
                className="hidden xl:inline-flex"
              >
                {contact.phone.display}
              </ButtonLink>
              <ButtonRouterLink to="/consultation" variant="primary" size="sm">
                Book Appointment
              </ButtonRouterLink>
            </div>
          </>
        )}
      </Container>
      {isMobile ? (
        <MobileSidebar
          open={menuOpen}
          onClose={() => {
            setMenuOpen(false);
            triggerRef.current?.focus();
          }}
        />
      ) : null}
    </header>
  );
}

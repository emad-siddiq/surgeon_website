/**
 * Logo lockup. Renders the practice mark and (optionally) the doctor's
 * name as a wordmark, wrapped in a router <Link to="/"> so it always
 * routes home.
 *
 * Props:
 *   - wordmark=false: icon only at 64px (used by HoverNavBar).
 *   - wordmark=true (default): 48px mark + name. Footer uses this.
 *   - compact=true: shows the short form ("Dr. Siddiq") instead of the
 *     full name. Currently unused but kept for tight layouts.
 */
import { Link } from 'react-router-dom';
import { doctor } from '@/content/doctor';
import logoSrc from '@/assets/logo.png';

interface LogoProps {
  className?: string;
  compact?: boolean;
  wordmark?: boolean;
}

export function Logo({ className = '', compact = false, wordmark = true }: LogoProps) {
  const size = wordmark ? 48 : 64;
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 ${className}`}
      aria-label={`${doctor.fullName}, home`}
    >
      <img
        src={logoSrc}
        alt={wordmark ? '' : `${doctor.fullName}, home`}
        aria-hidden={wordmark ? 'true' : undefined}
        width={size}
        height={size}
        className={wordmark ? 'h-12 w-12 rounded-sm object-contain' : 'h-16 w-16 rounded-sm object-contain'}
      />
      {wordmark ? (
        <span className="text-[17px] font-medium tracking-tight text-textPrimary">
          {compact ? doctor.short : doctor.fullName}
        </span>
      ) : null}
    </Link>
  );
}

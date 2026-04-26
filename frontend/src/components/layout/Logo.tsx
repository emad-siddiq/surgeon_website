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
      aria-label={`${doctor.fullName} — home`}
    >
      <img
        src={logoSrc}
        alt={wordmark ? '' : `${doctor.fullName} — home`}
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

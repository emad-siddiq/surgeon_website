import { Link } from 'react-router-dom';
import { doctor } from '@/content/doctor';
import logoSrc from '@/assets/logo.png';

interface LogoProps {
  className?: string;
  compact?: boolean;
}

export function Logo({ className = '', compact = false }: LogoProps) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 ${className}`}
      aria-label={`${doctor.fullName} — home`}
    >
      <img
        src={logoSrc}
        alt=""
        aria-hidden="true"
        width={36}
        height={36}
        className="h-9 w-9 rounded-sm object-contain"
      />
      <span className="text-[16px] font-medium tracking-tight text-textPrimary">
        {compact ? doctor.short : doctor.fullName}
      </span>
    </Link>
  );
}

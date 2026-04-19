import { Link } from 'react-router-dom';
import { doctor } from '@/content/doctor';

interface LogoProps {
  className?: string;
  compact?: boolean;
}

export function Logo({ className = '', compact = false }: LogoProps) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label={`${doctor.fullName} — home`}
    >
      <span
        aria-hidden="true"
        className="inline-block h-6 w-6 rounded-full"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #F3D4C1, #B2553A 75%)',
        }}
      />
      <span
        className="font-serif text-[17px] font-medium tracking-tight text-ink"
        style={{ fontVariationSettings: '"opsz" 36, "SOFT" 40' }}
      >
        {compact ? doctor.short : 'Ghulam\u00a0Siddiq'}
        <span className="text-ink3">,&nbsp;MD</span>
      </span>
    </Link>
  );
}

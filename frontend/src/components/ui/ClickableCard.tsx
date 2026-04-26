import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ClickableCardProps {
  onClick: () => void;
  ariaLabel: string;
  /** Card body. Use mt-auto on the trailing element to push it down. */
  children: ReactNode;
  /** Extra classes appended to the base card shell. */
  className?: string;
}

/**
 * The card shell shared by /procedures, /bariatric, and the home page's
 * featured procedures grid: a real <button> for keyboard accessibility,
 * with the standard hover-lift + focus ring + border tint. Callers
 * compose the body (Tag/number, headline, summary, "Learn more" hint).
 */
export function ClickableCard({ onClick, ariaLabel, children, className }: ClickableCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-label={ariaLabel}
      className={cn(
        'group flex h-full w-full flex-col rounded-lg border border-border1 bg-white p-6 text-left shadow-card',
        'transition-[transform,box-shadow,border-color] duration-[220ms] ease-breathe',
        'hover:-translate-y-1 hover:border-primary hover:shadow-raised',
        'focus-visible:border-primary focus-visible:outline-none',
        className,
      )}
    >
      {children}
    </button>
  );
}

/**
 * The "Learn more →" affordance shown at the bottom of every clickable
 * card. Uses an inline SVG arrow with a tiny hover translate so the
 * whole card feels alive when the user mouses over it.
 */
export function LearnMoreHint({ children = 'Learn more' }: { children?: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-primary transition-transform duration-[220ms] ease-breathe group-hover:translate-x-0.5"
    >
      {children}
      <svg
        width={14}
        height={14}
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="M2 7h10M8 3l4 4-4 4" />
      </svg>
    </span>
  );
}

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'solid';
  /** Required — this button is icon-only, so an aria-label is mandatory. */
  'aria-label': string;
  children?: ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant = 'default', className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-[180ms] ease-breathe',
        variant === 'default'
          ? 'bg-paper border-border1 text-ink hover:bg-peach50 hover:border-border2'
          : 'bg-clay border-transparent text-paper hover:bg-clayDark',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
});

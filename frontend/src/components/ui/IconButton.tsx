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
          ? 'bg-white border-border1 text-textPrimary hover:border-primary hover:text-primary'
          : 'bg-primary border-transparent text-white hover:bg-primaryHover',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
});

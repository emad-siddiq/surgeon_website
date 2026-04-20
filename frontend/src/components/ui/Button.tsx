import {
  forwardRef,
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
  type ReactNode,
} from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-sans font-medium leading-none ' +
  'transition-[transform,background-color,box-shadow,color,border-color] duration-[180ms] ease-breathe ' +
  'border border-transparent disabled:cursor-not-allowed disabled:transform-none ' +
  // 44px minimum touch target per WCAG + iOS HIG. `min-h` covers it
  // regardless of the size variant's padding so mobile taps always land.
  'min-h-[44px]';

const sizing: Record<ButtonSize, string> = {
  sm: 'text-sm px-4 py-2',
  md: 'text-[15px] px-5 py-3',
};

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primaryHover hover:-translate-y-0.5 ' +
    'active:translate-y-0 disabled:bg-border2 disabled:text-white',
  secondary:
    'bg-white text-textPrimary border-border2 hover:border-primary hover:text-primary ' +
    'disabled:opacity-60',
  ghost:
    'bg-transparent text-primary hover:text-primaryHover px-3 py-2 disabled:opacity-60',
};

function classesFor(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return cn(base, sizing[size], variants[variant], className);
}

export interface ButtonProps extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button ref={ref} type={type} className={classesFor(variant, size, className)} {...rest}>
      {children}
    </button>
  );
});

export interface ButtonLinkProps extends BaseProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a className={classesFor(variant, size, className)} {...rest}>
      {children}
    </a>
  );
}

export interface ButtonRouterLinkProps extends BaseProps, Omit<LinkProps, 'className'> {}

export function ButtonRouterLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonRouterLinkProps) {
  return (
    <Link className={classesFor(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

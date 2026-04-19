import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from 'react';
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
  'inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium leading-none ' +
  'transition-[transform,background-color,box-shadow,color,border-color] duration-[180ms] ease-breathe ' +
  'border border-transparent disabled:cursor-not-allowed disabled:transform-none';

const sizing: Record<ButtonSize, string> = {
  sm: 'text-sm px-4 py-2.5',
  md: 'text-[15px] px-[22px] py-[14px]',
};

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-clay text-paper hover:bg-clayDark hover:-translate-y-px active:translate-y-0 ' +
    'disabled:bg-border2 disabled:text-paper',
  secondary:
    'bg-transparent text-ink border-border2 hover:bg-paper hover:border-ink2 ' +
    'disabled:opacity-60',
  ghost: 'bg-transparent text-ink hover:text-clayDark px-3.5 py-2.5 disabled:opacity-60',
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
  // eslint-disable-next-line jsx-a11y/anchor-has-content
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

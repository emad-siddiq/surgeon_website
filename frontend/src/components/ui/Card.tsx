import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type CardTone = 'base' | 'surface' | 'primary';
export type CardPadding = 'sm' | 'md' | 'lg';

const toneClass: Record<CardTone, string> = {
  base: 'bg-white border-border1 text-textPrimary',
  surface: 'bg-surface border-border1 text-textPrimary',
  primary: 'bg-primary border-transparent text-white',
};

const paddingClass: Record<CardPadding, string> = {
  sm: 'p-5',
  md: 'p-6 md:p-7',
  lg: 'p-8 md:p-10',
};

export interface CardProps extends HTMLAttributes<HTMLElement> {
  tone?: CardTone;
  padding?: CardPadding;
  interactive?: boolean;
  as?: 'div' | 'article' | 'section' | 'aside' | 'figure';
  children?: ReactNode;
}

export function Card({
  tone = 'base',
  padding = 'md',
  interactive = false,
  className,
  children,
  as: Tag = 'div',
  ...rest
}: CardProps) {
  return (
    <Tag
      className={cn(
        'rounded-lg border shadow-card',
        toneClass[tone],
        paddingClass[padding],
        interactive &&
          'transition-[transform,box-shadow,border-color] duration-[250ms] ease-breathe ' +
            'hover:-translate-y-1 hover:shadow-raised hover:border-primary',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

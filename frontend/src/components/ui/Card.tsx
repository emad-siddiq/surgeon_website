import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type CardTone = 'paper' | 'peach' | 'lilac' | 'ink';
export type CardPadding = 'sm' | 'md' | 'lg';

const toneClass: Record<CardTone, string> = {
  paper: 'bg-paper border-border1 text-ink',
  peach: 'bg-peach50 border-[rgba(178,85,58,0.12)] text-ink',
  lilac: 'bg-lilac50 border-[rgba(75,69,102,0.10)] text-ink',
  ink: 'bg-ink border-transparent text-cream',
};

const paddingClass: Record<CardPadding, string> = {
  sm: 'p-5',
  md: 'p-7',
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
  tone = 'paper',
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
        'rounded-lg border',
        toneClass[tone],
        paddingClass[padding],
        interactive &&
          'transition-[transform,box-shadow,border-color] duration-[250ms] ease-breathe ' +
            'hover:-translate-y-0.5 hover:shadow-raised hover:border-border2',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

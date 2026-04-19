import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';

export type SectionTone = 'cream' | 'paper' | 'peach' | 'lilac' | 'ink';
export type SectionSize = 'sm' | 'md' | 'lg';

const toneClass: Record<SectionTone, string> = {
  cream: 'bg-cream text-ink',
  paper: 'bg-paper text-ink',
  peach: 'bg-peach50 text-ink',
  lilac: 'bg-lilac50 text-ink',
  ink: 'bg-ink text-cream',
};

const sizeClass: Record<SectionSize, string> = {
  sm: 'pt-12 pb-16',
  md: 'pt-20 pb-24',
  lg: 'pt-24 pb-32',
};

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  size?: SectionSize;
  containerClassName?: string;
  children?: ReactNode;
  as?: 'section' | 'div' | 'article' | 'aside';
}

export function Section({
  tone = 'cream',
  size = 'md',
  className,
  containerClassName,
  children,
  as: Tag = 'section',
  ...rest
}: SectionProps) {
  return (
    <Tag className={cn(toneClass[tone], sizeClass[size], className)} {...rest}>
      <Container className={containerClassName}>{children}</Container>
    </Tag>
  );
}

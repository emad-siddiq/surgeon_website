import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';

export type SectionTone = 'base' | 'surface' | 'gradient' | 'dark';
export type SectionSize = 'sm' | 'md' | 'lg';

const toneClass: Record<SectionTone, string> = {
  base: 'bg-canvas text-textPrimary',
  surface: 'bg-surface text-textPrimary',
  gradient: 'bg-gradient-hero text-textPrimary',
  dark: 'bg-textPrimary text-white',
};

// Slimmer vertical padding on narrow screens so sections don't feel
// like they're drifting apart on a 375px viewport.
const sizeClass: Record<SectionSize, string> = {
  sm: 'py-10 md:py-12',
  md: 'py-12 sm:py-16 md:py-20',
  lg: 'py-16 sm:py-20 md:py-28',
};

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  size?: SectionSize;
  containerClassName?: string;
  children?: ReactNode;
  as?: 'section' | 'div' | 'article' | 'aside';
}

export function Section({
  tone = 'base',
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

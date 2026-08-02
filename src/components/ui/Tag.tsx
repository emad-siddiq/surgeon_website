import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type TagTone = 'primary' | 'accent' | 'neutral';

const toneClass: Record<TagTone, string> = {
  primary: 'bg-primary/10 text-primary border-primary/20',
  accent: 'bg-accent/10 text-accentDeep border-accent/20',
  neutral: 'bg-surface text-textSecondary border-border1',
};

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: TagTone;
  children?: ReactNode;
}

export function Tag({ tone = 'primary', className, children, ...rest }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium tracking-wide',
        toneClass[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

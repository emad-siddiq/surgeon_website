import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface EyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  tone?: 'primary' | 'muted';
  children?: ReactNode;
}

export function Eyebrow({ tone = 'primary', className, children, ...rest }: EyebrowProps) {
  return (
    <p
      className={cn(
        't-eyebrow',
        tone === 'primary' ? 'text-primary' : 'text-textMuted',
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  );
}

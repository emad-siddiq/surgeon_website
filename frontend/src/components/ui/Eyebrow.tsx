import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface EyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  rule?: boolean;
  tone?: 'ink2' | 'ink3';
  children?: ReactNode;
}

export function Eyebrow({
  rule = false,
  tone = 'ink3',
  className,
  children,
  ...rest
}: EyebrowProps) {
  return (
    <p
      className={cn(
        't-eyebrow',
        rule ? 'eyebrow-rule' : tone === 'ink3' ? 'text-ink3' : 'text-ink2',
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  );
}

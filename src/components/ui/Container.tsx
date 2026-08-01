import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function Container({ className, children, ...rest }: ContainerProps) {
  // Tighter gutters on very narrow screens (iPhone SE ~375px) to give
  // cards more breathing room; bumps up at sm (640px) and md (768px).
  return (
    <div
      className={cn('mx-auto w-full max-w-container px-4 sm:px-6 md:px-10', className)}
      {...rest}
    >
      {children}
    </div>
  );
}

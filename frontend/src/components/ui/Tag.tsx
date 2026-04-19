import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type TagTone = 'peach' | 'sage' | 'lilac';

const toneClass: Record<TagTone, string> = {
  peach: 'bg-peach50 text-clayDark border-[rgba(178,85,58,0.12)]',
  sage: 'bg-[#E7ECDF] text-[#485640] border-[rgba(107,122,90,0.18)]',
  lilac: 'bg-lilac50 text-[#4B4566] border-[rgba(75,69,102,0.12)]',
};

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: TagTone;
  children?: ReactNode;
}

export function Tag({ tone = 'peach', className, children, ...rest }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium tracking-[0.02em]',
        toneClass[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

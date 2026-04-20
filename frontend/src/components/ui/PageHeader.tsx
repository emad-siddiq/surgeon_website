import type { ReactNode } from 'react';
import { Container } from './Container';
import { Eyebrow } from './Eyebrow';
import { cn } from '@/lib/cn';

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  /** `gradient` (default) | `base` | `surface` */
  tone?: 'gradient' | 'base' | 'surface';
  className?: string;
}

/**
 * Consistent top-of-page intro: soft gradient band (by default), eyebrow +
 * display headline + lead + optional CTAs. Every sub-page uses this so
 * they feel part of the same product.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  actions,
  tone = 'gradient',
  className,
}: PageHeaderProps) {
  const toneClass =
    tone === 'gradient'
      ? 'bg-gradient-hero'
      : tone === 'surface'
        ? 'bg-surface'
        : 'bg-base';
  return (
    <section className={cn(toneClass, className)}>
      <Container className="py-16 md:py-20 lg:py-24">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="t-display mt-4 max-w-[22ch]">{title}</h1>
        {lead ? (
          <p className="t-body-lg mt-6 max-w-[62ch] text-textSecondary">{lead}</p>
        ) : null}
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
      </Container>
    </section>
  );
}

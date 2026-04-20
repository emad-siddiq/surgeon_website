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
      <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="t-display mt-3 max-w-[22ch] sm:mt-4">{title}</h1>
        {lead ? (
          <p className="t-body-lg mt-4 max-w-[62ch] text-textSecondary sm:mt-6">{lead}</p>
        ) : null}
        {actions ? (
          // Stack on phones so buttons don't get squeezed; wrap from sm up.
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            {actions}
          </div>
        ) : null}
      </Container>
    </section>
  );
}

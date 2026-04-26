import type { ReactNode } from 'react';
import { Container } from './Container';
import { Eyebrow } from './Eyebrow';

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
}

/**
 * Consistent top-of-page intro: soft gradient band, eyebrow + display
 * headline + lead + optional CTAs. Every sub-page uses this so they
 * feel part of the same product.
 */
export function PageHeader({ eyebrow, title, lead, actions }: PageHeaderProps) {
  return (
    <section className="bg-gradient-hero">
      <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="t-display mt-3 max-w-[22ch] sm:mt-4 md:max-w-[34ch] lg:max-w-[40ch]">
          {title}
        </h1>
        {lead ? (
          <p className="t-body-lg mt-4 max-w-[62ch] text-textSecondary sm:mt-6 md:max-w-[72ch]">
            {lead}
          </p>
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

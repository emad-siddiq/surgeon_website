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
 *
 * Layout: stacked under lg; on lg+ splits into 7/5 grid with eyebrow +
 * title on the left and lead + actions on the right. The split keeps the
 * wide-desktop container from leaving half the band empty next to short
 * display titles.
 */
export function PageHeader({ eyebrow, title, lead, actions }: PageHeaderProps) {
  const hasSide = Boolean(lead || actions);
  return (
    <section className="bg-gradient-hero">
      <Container className="py-8 sm:py-14 md:py-20 lg:py-24">
        <div
          className={
            hasSide
              ? 'grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12 lg:items-end'
              : ''
          }
        >
          <div className={hasSide ? 'lg:col-span-7' : ''}>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1 className="t-display mt-3 max-w-[22ch] sm:mt-4 md:max-w-[34ch] lg:max-w-none">
              {title}
            </h1>
          </div>
          {hasSide ? (
            <div className="lg:col-span-5">
              {lead ? (
                <p className="t-body-lg max-w-[62ch] text-textSecondary md:max-w-[72ch] lg:max-w-none">
                  {lead}
                </p>
              ) : null}
              {actions ? (
                // Stack on phones so buttons don't get squeezed; wrap from sm up.
                <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                  {actions}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

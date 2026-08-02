import type { ReactNode } from 'react';
import { Container } from './Container';
import { Eyebrow } from './Eyebrow';
import { ButtonRouterLink } from './Button';

interface CtaBandProps {
  eyebrow: string;
  headline: ReactNode;
  body?: ReactNode;
  to: string;
  cta: string;
  variant?: 'primary' | 'secondary';
  /** Optional anchor id — used on Home so SectionProgress can observe it. */
  id?: string;
}

/**
 * Gradient-hero CTA strip that closes most pages: eyebrow + h2 +
 * optional paragraph on the left, single ButtonRouterLink on the
 * right. On phones the column stacks; on md+ the button sits flush
 * at the right.
 */
export function CtaBand({
  eyebrow,
  headline,
  body,
  to,
  cta,
  variant = 'primary',
  id,
}: CtaBandProps) {
  return (
    <section id={id} className="bg-surface">
      <Container className="py-12 sm:py-14 md:py-20">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr,auto]">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="t-h1 mt-3 max-w-measure-22">{headline}</h2>
            {body ? (
              <p className="t-body mt-3 max-w-measure-62 text-textSecondary">{body}</p>
            ) : null}
          </div>
          <ButtonRouterLink to={to} variant={variant} className="w-full md:w-auto">
            {cta}
          </ButtonRouterLink>
        </div>
      </Container>
    </section>
  );
}

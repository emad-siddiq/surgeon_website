/**
 * `/distinctions` route. PageHeader → one <Section> per distinction
 * with alternating tone (base / surface) and alternating image side
 * (left on even index, right on odd via the [&>*:first-child]:order-last
 * trick) → CtaBand close.
 *
 * Distinctions come from content/distinctions.ts. The first
 * distinction's image is `loading="eager"` because it's above the fold;
 * the rest are lazy.
 */
import { Seo } from '@/components/seo/Seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CtaBand } from '@/components/ui/CtaBand';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { distinctions, distinctionsHeading } from '@/content/distinctions';

export function Distinctions() {
  return (
    <>
      <Seo
        title="Distinctions"
        description="Recognition and awards for Dr. Ghulam Siddiq: the Presidential Award for Surgical Excellence, the presidency of the Pakistan Obesity and Metabolic Surgery Society, and a record of 970 bariatric procedures."
        path="/distinctions"
      />

      <PageHeader
        eyebrow="Recognition"
        title={<>{distinctionsHeading}.</>}
        lead="Two decades of laparoscopic practice: a national award, a society presidency, and a caseload built patient by patient."
      />

      {distinctions.map((d, i) => (
        <Section
          key={d.title}
          tone={i % 2 === 0 ? 'base' : 'surface'}
          size="md"
          aria-labelledby={`distinction-${i}`}
        >
          <div
            className={`grid grid-cols-1 items-center gap-10 md:grid-cols-12 ${
              i % 2 === 1 ? 'md:[&>*:first-child]:order-last' : ''
            }`}
          >
            <div className="md:col-span-5">
              <img
                src={d.image}
                alt={d.imageAlt}
                className="w-full rounded-lg border border-border1 object-cover shadow-card"
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
            <div className="md:col-span-7">
              <Eyebrow>0{i + 1}</Eyebrow>
              {d.stat ? (
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-5xl font-medium tracking-tight text-primary md:text-6xl">
                    <AnimatedCounter to={Number(d.stat.value)} />
                  </span>
                  <span className="t-caption uppercase tracking-eyebrow text-textMuted">
                    {d.stat.label}
                  </span>
                </div>
              ) : null}
              <h2 id={`distinction-${i}`} className="t-h1 mt-4 max-w-measure-22">
                {d.title}
              </h2>
              <p className="t-body-lg mt-5 max-w-measure-62 text-textSecondary">{d.body}</p>
            </div>
          </div>
        </Section>
      ))}

      <CtaBand
        eyebrow="Want to discuss your case?"
        headline="Book a consultation."
        to="/consultation"
        cta="Book an Appointment"
      />
    </>
  );
}

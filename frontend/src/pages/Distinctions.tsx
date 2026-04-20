import { Seo } from '@/components/seo/Seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonRouterLink } from '@/components/ui/Button';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { distinctions, distinctionsHeading } from '@/content/distinctions';

export function Distinctions() {
  return (
    <>
      <Seo
        title="Distinctions"
        description="Recognition and awards for Dr. Ghulam Siddiq — Presidential Award for Surgical Excellence and international renown in endoscopic surgery with 970+ bariatric procedures."
        path="/distinctions"
      />

      <PageHeader
        eyebrow="Recognition"
        title={<>{distinctionsHeading}.</>}
        lead="Two decades of laparoscopic and bariatric practice in Pakistan — recognised nationally and internationally."
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
                  <span className="t-caption uppercase tracking-widest text-textMuted">
                    {d.stat.label}
                  </span>
                </div>
              ) : null}
              <h2 id={`distinction-${i}`} className="t-h1 mt-4 max-w-[22ch]">
                {d.title}
              </h2>
              <p className="t-body-lg mt-5 max-w-[62ch] text-textSecondary">{d.body}</p>
            </div>
          </div>
        </Section>
      ))}

      <section className="bg-gradient-hero">
        <div className="mx-auto w-full max-w-container px-6 py-14 md:px-10 md:py-20">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr,auto]">
            <div>
              <Eyebrow>Want to discuss your case?</Eyebrow>
              <h2 className="t-h1 mt-3 max-w-[22ch]">Book a consultation.</h2>
            </div>
            <ButtonRouterLink to="/consultation" variant="primary">
              Book an Appointment
            </ButtonRouterLink>
          </div>
        </div>
      </section>
    </>
  );
}

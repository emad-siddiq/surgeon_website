import { Seo } from '@/components/seo/Seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonRouterLink } from '@/components/ui/Button';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { bariatricIntro, bariatricProcedures } from '@/content/services';
import { bariatricPortrait } from '@/content/media';

export function Bariatric() {
  return (
    <>
      <Seo
        title="Bariatric Surgery"
        description="Laparoscopic bariatric surgery at Shifa International Hospital, Islamabad — Roux-en-Y gastric bypass, sleeve gastrectomy, mini gastric bypass (OAGB), and revision surgery."
        path="/bariatric"
      />

      <PageHeader
        eyebrow={bariatricIntro.title}
        title={<>{bariatricIntro.subtitle}</>}
        lead={bariatricIntro.body[0]}
        actions={
          <>
            <ButtonRouterLink to="/consultation" variant="primary">
              Book a bariatric consultation
            </ButtonRouterLink>
            <ButtonRouterLink to="/transformations" variant="secondary">
              See transformations →
            </ButtonRouterLink>
          </>
        }
      />

      <Section tone="base" size="md">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <img
              src={bariatricPortrait.src}
              alt={bariatricPortrait.alt}
              className="w-full rounded-lg border border-border1 object-cover shadow-card"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="md:col-span-7">
            <Eyebrow>A pioneering practice in Pakistan</Eyebrow>
            <h2 className="t-h1 mt-3 max-w-[20ch]">25 years, 1,400+ cases.</h2>
            {bariatricIntro.body.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0 ? 't-body-lg mt-6 text-textSecondary' : 't-body mt-4 text-textSecondary'
                }
              >
                {p}
              </p>
            ))}
            <dl className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <dt className="t-caption text-textMuted">Bariatric procedures</dt>
                <dd className="mt-2 text-3xl font-medium text-primary">
                  <AnimatedCounter to={970} suffix="+" />
                </dd>
              </div>
              <div>
                <dt className="t-caption text-textMuted">Total laparoscopic cases</dt>
                <dd className="mt-2 text-3xl font-medium text-primary">
                  <AnimatedCounter to={1400} suffix="+" />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>

      <Section tone="surface" size="lg" aria-labelledby="bariatric-procedures-heading">
        <Eyebrow>The four operations</Eyebrow>
        <h2 id="bariatric-procedures-heading" className="t-h1 mt-3 max-w-[22ch]">
          Procedures Dr. Siddiq routinely performs.
        </h2>
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {bariatricProcedures.map((proc) => (
            <li key={proc.number}>
              <Card as="article" padding="lg" interactive className="h-full">
                <span
                  aria-hidden="true"
                  className="text-sm font-medium tracking-[0.18em] text-primary"
                >
                  {proc.number}
                </span>
                <h3 className="mt-3 text-[22px] font-medium leading-snug">{proc.title}</h3>
                <p className="t-body mt-3 text-textSecondary">{proc.body}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <section className="bg-gradient-hero">
        <div className="mx-auto w-full max-w-container px-6 py-16 md:px-10 md:py-20">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr,auto]">
            <div>
              <Eyebrow>Next step</Eyebrow>
              <h2 className="t-h1 mt-3 max-w-[22ch]">A careful first conversation.</h2>
              <p className="t-body mt-3 max-w-[56ch] text-textSecondary">
                Bariatric surgery is a long-term partnership. Book an unhurried first visit and
                we’ll walk through your history, goals, and the honest trade-offs of each
                procedure.
              </p>
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

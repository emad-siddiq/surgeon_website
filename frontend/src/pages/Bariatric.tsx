import { useState } from 'react';
import { Seo } from '@/components/seo/Seo';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonRouterLink } from '@/components/ui/Button';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { ProcedureDetailModal } from '@/components/ui/ProcedureDetailModal';
import {
  bariatricIntro,
  bariatricProcedures,
  type BariatricProcedure,
} from '@/content/services';
import { bariatricPortrait } from '@/content/media';
import { cn } from '@/lib/cn';

function BariatricCard({
  proc,
  onOpen,
}: {
  proc: BariatricProcedure;
  onOpen: (proc: BariatricProcedure) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(proc)}
      aria-haspopup="dialog"
      aria-label={`Learn more about ${proc.title}`}
      className={cn(
        'group flex h-full w-full flex-col rounded-lg border border-border1 bg-white p-6 text-left shadow-card md:p-8',
        'transition-[transform,box-shadow,border-color] duration-[220ms] ease-breathe',
        'hover:-translate-y-1 hover:border-primary hover:shadow-raised',
        'focus-visible:border-primary focus-visible:outline-none',
      )}
    >
      <span
        aria-hidden="true"
        className="text-sm font-medium tracking-[0.18em] text-primary"
      >
        {proc.number}
      </span>
      <h3 className="mt-3 text-[1.375rem] font-medium leading-snug">{proc.title}</h3>
      <p className="t-body mt-3 text-textSecondary">{proc.summary}</p>
      <span
        aria-hidden="true"
        className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-primary transition-transform duration-[220ms] ease-breathe group-hover:translate-x-0.5"
      >
        Learn more
        <svg
          width={14}
          height={14}
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M2 7h10M8 3l4 4-4 4" />
        </svg>
      </span>
    </button>
  );
}

export function Bariatric() {
  const [active, setActive] = useState<BariatricProcedure | null>(null);

  return (
    <>
      <Seo
        title="Bariatric Surgery"
        description="Laparoscopic bariatric surgery at Shifa International Hospital, Islamabad — Roux-en-Y gastric bypass, sleeve gastrectomy, mini gastric bypass (OAGB), and revision surgery. Click any procedure for patient-oriented details."
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
                  i === 0
                    ? 't-body-lg mt-6 text-textSecondary'
                    : 't-body mt-4 text-textSecondary'
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
        <p className="t-body mt-4 max-w-[64ch] text-textSecondary">
          Click any operation below for a patient-oriented explanation written in plain
          language — who it is for, how the operation is performed, what recovery typically
          looks like, and the long-term commitments that come with each choice.
        </p>
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {bariatricProcedures.map((proc) => (
            <li key={proc.number} className="flex">
              <BariatricCard proc={proc} onOpen={setActive} />
            </li>
          ))}
        </ul>
      </Section>

      <section className="bg-gradient-hero">
        <Container className="py-12 sm:py-16 md:py-20">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr,auto]">
            <div>
              <Eyebrow>Next step</Eyebrow>
              <h2 className="t-h1 mt-3 max-w-[22ch]">A careful first conversation.</h2>
              <p className="t-body mt-3 max-w-[56ch] text-textSecondary">
                Bariatric surgery is a long-term partnership rather than a one-off event. Book
                an unhurried first visit and we’ll walk through your medical history, your
                goals, and the honest trade-offs of each procedure — together — before any
                decision is made.
              </p>
            </div>
            <ButtonRouterLink
              to="/consultation"
              variant="primary"
              className="w-full md:w-auto"
            >
              Book an Appointment
            </ButtonRouterLink>
          </div>
        </Container>
      </section>

      <ProcedureDetailModal
        open={active !== null}
        onClose={() => setActive(null)}
        eyebrow={active ? `Procedure ${active.number}` : undefined}
        title={active?.title ?? ''}
        summary={active?.summary ?? ''}
        sections={active?.details.sections ?? []}
      />
    </>
  );
}

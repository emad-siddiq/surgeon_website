/**
 * `/bariatric` route. The practice's headline specialty page.
 *
 * Layout: PageHeader → bariatric portrait + intro paragraphs + total-
 * cases counters → grid of four BariatricCards (Roux-en-Y, sleeve,
 * OAGB, revision) → custom surface CTA strip closing the page.
 *
 * BariatricCard is a local <ClickableCard> wrapper that renders proc
 * number / title / summary and opens <ProcedureDetailModal>. Bariatric
 * procedures come from `bariatricProcedures` in content/services.ts —
 * a separate dataset from the main `services` array because the shape
 * is different (carries a `number` label like "01", no `volume`).
 */
import { useState } from 'react';
import { Seo } from '@/components/seo/Seo';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonRouterLink } from '@/components/ui/Button';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { ProcedureDetailModal } from '@/components/ui/ProcedureDetailModal';
import { ClickableCard, LearnMoreHint } from '@/components/ui/ClickableCard';
import {
  bariatricIntro,
  bariatricProcedures,
  type BariatricProcedure,
} from '@/content/services';
import { bariatricPortrait } from '@/content/media';

function BariatricCard({
  proc,
  onOpen,
}: {
  proc: BariatricProcedure;
  onOpen: (proc: BariatricProcedure) => void;
}) {
  return (
    <ClickableCard
      onClick={() => onOpen(proc)}
      ariaLabel={`Learn more about ${proc.title}`}
      className="md:p-8"
    >
      <span aria-hidden="true" className="text-sm font-medium tracking-eyebrow text-primary">
        {proc.number}
      </span>
      <h3 className="t-h3 mt-3">{proc.title}</h3>
      <p className="t-body mt-3 text-textSecondary">{proc.summary}</p>
      <LearnMoreHint />
    </ClickableCard>
  );
}

export function Bariatric() {
  const [active, setActive] = useState<BariatricProcedure | null>(null);

  return (
    <>
      <Seo
        title="Bariatric Surgery"
        description="Laparoscopic bariatric surgery at Shifa International Hospital, Islamabad: Roux-en-Y gastric bypass, sleeve gastrectomy, mini gastric bypass (OAGB), and revision surgery. Click any procedure for patient-oriented details."
        path="/bariatric"
      />

      <PageHeader
        eyebrow={bariatricIntro.title}
        title={<>{bariatricIntro.subtitle}</>}
        lead={bariatricIntro.lead}
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
            <Eyebrow>The practice in numbers</Eyebrow>
            <h2 className="t-h1 mt-3 max-w-measure-20">25 years, 1,400+ cases.</h2>
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
        <h2 id="bariatric-procedures-heading" className="t-h1 mt-3 max-w-measure-22">
          Procedures Dr. Siddiq routinely performs.
        </h2>
        <p className="t-body mt-4 max-w-measure-64 text-textSecondary">
          Click any operation below for a patient-oriented explanation written in plain
          language: who it is for, how the operation is performed, what recovery typically
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

      <section className="bg-surface">
        <Container className="py-12 sm:py-16 md:py-20">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr,auto]">
            <div>
              <Eyebrow>Next step</Eyebrow>
              <h2 className="t-h1 mt-3 max-w-measure-22">A careful first conversation.</h2>
              <p className="t-body mt-3 max-w-measure-56 text-textSecondary">
                Bariatric surgery is a long-term partnership rather than a one-off event. Book
                an unhurried first visit and we’ll walk through your medical history, your
                goals, and the honest trade-offs of each procedure together, before any
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

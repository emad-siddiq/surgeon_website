import { useState } from 'react';
import { Seo } from '@/components/seo/Seo';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Tag, type TagTone } from '@/components/ui/Tag';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { ButtonRouterLink } from '@/components/ui/Button';
import { ProcedureDetailModal } from '@/components/ui/ProcedureDetailModal';
import { services, type ServiceEntry, type Category } from '@/content/services';
import { cn } from '@/lib/cn';

const categoryTone: Record<Category, TagTone> = {
  General: 'primary',
  Bariatric: 'accent',
  Colorectal: 'accent',
  'Upper GI': 'neutral',
};

const categoryOrder: Category[] = ['General', 'Bariatric', 'Colorectal', 'Upper GI'];

const categoryHeading: Record<Category, string> = {
  General: 'General laparoscopic surgery',
  Bariatric: 'Bariatric surgery',
  Colorectal: 'Colorectal procedures',
  'Upper GI': 'Upper gastrointestinal surgery',
};

function groupByCategory(list: ServiceEntry[]) {
  const map = new Map<Category, ServiceEntry[]>();
  for (const entry of list) {
    const bucket = map.get(entry.category) ?? [];
    bucket.push(entry);
    map.set(entry.category, bucket);
  }
  return categoryOrder
    .map((category) => ({ category, items: map.get(category) ?? [] }))
    .filter((group) => group.items.length > 0);
}

/**
 * A card that behaves as a button. Opens the detail modal on click,
 * and is keyboard-accessible out of the box because it IS a button.
 */
function ProcedureCard({
  service,
  onOpen,
}: {
  service: ServiceEntry;
  onOpen: (service: ServiceEntry) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(service)}
      aria-haspopup="dialog"
      aria-label={`Learn more about ${service.title}`}
      className={cn(
        'group flex h-full w-full flex-col rounded-lg border border-border1 bg-white p-6 text-left shadow-card',
        'transition-[transform,box-shadow,border-color] duration-[220ms] ease-breathe',
        'hover:-translate-y-1 hover:border-primary hover:shadow-raised',
        'focus-visible:border-primary focus-visible:outline-none',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <Tag tone={categoryTone[service.category]}>{service.category}</Tag>
        <span className="text-lg font-medium text-primary">
          <AnimatedCounter to={service.volume} suffix="+" />
        </span>
      </div>

      <h3 className="mt-4 text-xl font-medium leading-snug">{service.title}</h3>
      <p className="t-caption mt-1 text-textMuted">{service.subtitle}</p>
      <p className="t-body mt-3 text-textSecondary">{service.summary}</p>

      <span
        aria-hidden="true"
        className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-primary transition-transform duration-[220ms] ease-breathe group-hover:translate-x-0.5"
      >
        Learn more
        <svg width={14} height={14} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M2 7h10M8 3l4 4-4 4" />
        </svg>
      </span>
    </button>
  );
}

export function Procedures() {
  const grouped = groupByCategory(services);
  const [active, setActive] = useState<ServiceEntry | null>(null);

  return (
    <>
      <Seo
        title="Procedures"
        description="Surgical procedures performed by Dr. Ghulam Siddiq at Shifa International Hospital — general laparoscopic, bariatric, colorectal, and upper-GI surgery. Click any procedure to read a patient-oriented explanation."
        path="/procedures"
      />

      <PageHeader
        eyebrow="Surgical Expertise & Experience"
        title={<>Procedures performed by Dr. Siddiq.</>}
        lead="Ten core operations, refined across 25 years of practice at Shifa International Hospital. Click any procedure for a plain-language explanation of what it treats, how it is performed, and what recovery looks like — written for patients, not clinicians."
        actions={
          <>
            <ButtonRouterLink to="/consultation" variant="primary">
              Book an Appointment
            </ButtonRouterLink>
            <ButtonRouterLink to="/bariatric" variant="secondary">
              Bariatric specialty →
            </ButtonRouterLink>
          </>
        }
      />

      {grouped.map((group, groupIdx) => (
        <Section
          key={group.category}
          tone={groupIdx % 2 === 0 ? 'base' : 'surface'}
          size="md"
          aria-labelledby={`group-${group.category}`}
        >
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>{group.category}</Eyebrow>
              <h2 id={`group-${group.category}`} className="t-h2 mt-2 max-w-[24ch]">
                {categoryHeading[group.category]}
              </h2>
            </div>
            <span className="text-sm text-textMuted">
              {group.items.length} procedure{group.items.length === 1 ? '' : 's'}
            </span>
          </header>

          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((service) => (
              <li key={service.slug} className="flex">
                <ProcedureCard service={service} onOpen={setActive} />
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <section className="bg-gradient-hero">
        <Container className="py-12 sm:py-14 md:py-20">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr,auto]">
            <div>
              <Eyebrow>Not sure which procedure applies?</Eyebrow>
              <h2 className="t-h1 mt-3 max-w-[22ch]">Start with a consultation.</h2>
              <p className="t-body mt-3 max-w-[60ch] text-textSecondary">
                A consultation is always the right first step. We review your medical history,
                imaging and personal goals carefully together before any operative plan is put
                on the table — so the path forward makes sense for your life, not just your chart.
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
        eyebrow={active?.category}
        title={active?.title ?? ''}
        subtitle={active?.subtitle}
        summary={active?.summary ?? ''}
        sections={active?.details.sections ?? []}
      />
    </>
  );
}

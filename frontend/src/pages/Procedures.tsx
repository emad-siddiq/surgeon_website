/**
 * `/procedures` route. PageHeader + one <Section> per category
 * (alternating tone="base" / tone="surface" bands), each section
 * showing the category's procedures as <ClickableCard>s. Card click
 * opens <ProcedureDetailModal> with the active service. Closes with
 * <CtaBand>.
 *
 * Procedures come from content/services.ts. groupByCategory() below
 * preserves the canonical category order (categoryOrder) regardless
 * of the array's natural order.
 */
import { useState } from 'react';
import { Seo } from '@/components/seo/Seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Tag, type TagTone } from '@/components/ui/Tag';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { ButtonRouterLink } from '@/components/ui/Button';
import { ProcedureDetailModal } from '@/components/ui/ProcedureDetailModal';
import { CtaBand } from '@/components/ui/CtaBand';
import { ClickableCard, LearnMoreHint } from '@/components/ui/ClickableCard';
import { services, type ServiceEntry, type Category } from '@/content/services';

// Category legend. Adding a new category requires updating ALL FOUR
// of these places in lockstep:
//   1. The `Category` literal union in content/services.ts.
//   2. categoryTone — the Tag colour shown on cards.
//   3. categoryOrder — the section order on the page.
//   4. categoryHeading — the long-form section heading.
// Missing any one will produce a runtime undefined or a missed section.
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

function ProcedureCard({
  service,
  onOpen,
}: {
  service: ServiceEntry;
  onOpen: (service: ServiceEntry) => void;
}) {
  return (
    <ClickableCard
      onClick={() => onOpen(service)}
      ariaLabel={`Learn more about ${service.title}`}
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
      <LearnMoreHint />
    </ClickableCard>
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

      <CtaBand
        eyebrow="Not sure which procedure applies?"
        headline="Start with a consultation."
        body="A consultation is always the right first step. We review your medical history, imaging and personal goals carefully together before any operative plan is put on the table — so the path forward makes sense for your life, not just your chart."
        to="/consultation"
        cta="Book an Appointment"
      />

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

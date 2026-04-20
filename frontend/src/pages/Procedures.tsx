import { Seo } from '@/components/seo/Seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Tag, type TagTone } from '@/components/ui/Tag';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { ButtonRouterLink } from '@/components/ui/Button';
import { services, type ServiceEntry } from '@/content/services';

const categoryTone: Record<ServiceEntry['category'], TagTone> = {
  General: 'primary',
  Bariatric: 'accent',
  Colorectal: 'accent',
  'Upper GI': 'neutral',
};

/**
 * Group procedures by category for a scannable page structure.
 */
const categoryOrder: ServiceEntry['category'][] = [
  'General',
  'Bariatric',
  'Colorectal',
  'Upper GI',
];

function groupByCategory(list: ServiceEntry[]) {
  const map = new Map<ServiceEntry['category'], ServiceEntry[]>();
  for (const entry of list) {
    const bucket = map.get(entry.category) ?? [];
    bucket.push(entry);
    map.set(entry.category, bucket);
  }
  return categoryOrder
    .map((category) => ({ category, items: map.get(category) ?? [] }))
    .filter((group) => group.items.length > 0);
}

export function Procedures() {
  const grouped = groupByCategory(services);

  return (
    <>
      <Seo
        title="Procedures"
        description="Surgical procedures performed by Dr. Ghulam Siddiq at Shifa International Hospital — general laparoscopic, bariatric, colorectal, and upper-GI surgery with approximate case volumes."
        path="/procedures"
      />

      <PageHeader
        eyebrow="Surgical Expertise & Experience"
        title={<>Procedures performed by Dr. Siddiq.</>}
        lead="Ten core operations across 25 years of practice at Shifa International Hospital. Case volumes are approximate, counted once per patient, and reflect the surgeon's career total."
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
                {group.category === 'General' && 'General laparoscopic surgery'}
                {group.category === 'Bariatric' && 'Bariatric surgery'}
                {group.category === 'Colorectal' && 'Colorectal procedures'}
                {group.category === 'Upper GI' && 'Upper gastrointestinal surgery'}
              </h2>
            </div>
            <span className="text-sm text-textMuted">
              {group.items.length} procedure{group.items.length === 1 ? '' : 's'}
            </span>
          </header>

          {/*
            Informational cards — NOT links. We intentionally do NOT
            apply the interactive (`hover lift` / `cursor-pointer`)
            affordance here because there is no detail page to land on
            yet. The whole-grid CTA below the section directs the user
            to the consultation form, which is the only real action
            available.
          */}
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((service) => (
              <li key={service.slug}>
                <Card as="article" padding="md" className="h-full">
                  <div className="flex items-start justify-between gap-4">
                    <Tag tone={categoryTone[service.category]}>{service.category}</Tag>
                    <span
                      className="text-lg font-medium text-primary"
                      aria-label={`${service.volume.toLocaleString()}+ cases`}
                    >
                      <AnimatedCounter to={service.volume} suffix="+" />
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-medium leading-snug">{service.title}</h3>
                  <p className="t-body mt-2 text-textSecondary">{service.subtitle}</p>
                </Card>
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <section className="bg-gradient-hero">
        <div className="mx-auto w-full max-w-container px-6 py-14 md:px-10 md:py-20">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr,auto]">
            <div>
              <Eyebrow>Not sure which procedure applies?</Eyebrow>
              <h2 className="t-h1 mt-3 max-w-[22ch]">Start with a consultation.</h2>
              <p className="t-body mt-3 max-w-[60ch] text-textSecondary">
                A consultation is the right first step — we review your case, imaging and goals
                before recommending anything operative.
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

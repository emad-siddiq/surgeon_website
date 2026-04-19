import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Card } from '@/components/ui/Card';
import { Tag, type TagTone } from '@/components/ui/Tag';
import { services, type ServiceEntry } from '@/content/services';

const categoryTone: Record<ServiceEntry['category'], TagTone> = {
  General: 'primary',
  Bariatric: 'accent',
  Colorectal: 'accent',
  'Upper GI': 'neutral',
};

function formatVolume(n: number): string {
  if (n >= 1000) {
    const thousands = n / 1000;
    return `${thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1)}k+`;
  }
  return `${n}+`;
}

export function Services() {
  return (
    <Section id="services" tone="surface" size="lg" aria-labelledby="services-heading">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <Eyebrow>Surgical Expertise &amp; Experience</Eyebrow>
          <h2 id="services-heading" className="t-h1 mt-3 max-w-[22ch]">
            Procedures performed by Dr. Siddiq.
          </h2>
          <p className="t-body mt-4 max-w-[60ch] text-textSecondary">
            Case volumes below are approximate, across 25 years of practice at Shifa International
            Hospital.
          </p>
        </div>
      </div>
      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={service.slug}>
            <Card as="article" padding="md" interactive className="h-full">
              <div className="flex items-start justify-between gap-4">
                <Tag tone={categoryTone[service.category]}>{service.category}</Tag>
                <span className="text-sm font-medium text-primary">
                  {formatVolume(service.volume)}
                </span>
              </div>
              <h3 className="mt-4 text-[20px] font-medium leading-snug">{service.title}</h3>
              <p className="t-body mt-2 text-textSecondary">{service.subtitle}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}

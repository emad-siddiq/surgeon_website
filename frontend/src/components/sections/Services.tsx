import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { ButtonRouterLink } from '@/components/ui/Button';
import { services } from '@/content/services';
import { cn } from '@/lib/cn';

const warmMat =
  'bg-[repeating-linear-gradient(135deg,rgba(31,27,23,.05)_0_1px,transparent_1px_10px)],' +
  'bg-[linear-gradient(180deg,#F3D4C1,#F9E7DA)]';

const coolMat =
  'bg-[repeating-linear-gradient(135deg,rgba(31,27,23,.04)_0_1px,transparent_1px_10px)],' +
  'bg-[linear-gradient(180deg,#DAD5EA,#ECEAF5)]';

export function Services() {
  return (
    <Section id="services" tone="cream" size="md" aria-labelledby="services-heading">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <Eyebrow rule>Service offerings</Eyebrow>
          <h2
            id="services-heading"
            className="font-display t-h1 mt-4 max-w-[22ch]"
          >
            What we do, plainly.
          </h2>
        </div>
        <ButtonRouterLink to="/#consultation" variant="ghost">
          Book a consult →
        </ButtonRouterLink>
      </div>
      <ul
        role="list"
        className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3"
      >
        {services.map((service) => (
          <li key={service.slug}>
            <Card as="article" padding="md" interactive>
              <div
                aria-hidden="true"
                className={cn(
                  'aspect-[5/4] rounded-lg border border-border1',
                  service.imageTone === 'warm' ? warmMat : coolMat,
                )}
              />
              <div className="mt-6">
                <Tag tone={service.tagTone}>{service.tag}</Tag>
                <h3
                  className="font-display mt-4 text-[26px]"
                  style={{ fontWeight: 500, lineHeight: 1.15 }}
                >
                  {service.title}
                </h3>
                <p className="t-body mt-3 text-ink2">{service.summary}</p>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}

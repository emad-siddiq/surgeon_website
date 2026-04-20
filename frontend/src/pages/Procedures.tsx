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

export function Procedures() {
  return (
    <>
      <Seo
        title="Procedures"
        description="Surgical procedures performed by Dr. Ghulam Siddiq at Shifa International Hospital — across general laparoscopic, bariatric, colorectal, and upper-GI surgery."
        path="/procedures"
      />

      <PageHeader
        eyebrow="Surgical Expertise & Experience"
        title={<>Procedures performed by Dr. Siddiq.</>}
        lead="Ten core operations across 25 years of practice at Shifa International Hospital. Case volumes are approximate — each is counted once per patient."
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

      <Section tone="base" size="lg" aria-labelledby="proc-list-heading">
        <h2 id="proc-list-heading" className="sr-only">
          Procedures
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug}>
              <Card as="article" padding="md" interactive className="h-full">
                <div className="flex items-start justify-between gap-4">
                  <Tag tone={categoryTone[service.category]}>{service.category}</Tag>
                  <span className="text-lg font-medium text-primary">
                    <AnimatedCounter to={service.volume} suffix="+" />
                  </span>
                </div>
                <h3 className="mt-4 text-[20px] font-medium leading-snug">{service.title}</h3>
                <p className="t-body mt-2 text-textSecondary">{service.subtitle}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" size="md">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr,auto]">
          <div>
            <Eyebrow>Not sure which procedure applies?</Eyebrow>
            <h2 className="t-h2 mt-3 max-w-[22ch]">Start with a consultation.</h2>
            <p className="t-body mt-3 max-w-[60ch] text-textSecondary">
              A consultation is the right first step — we review your case, imaging and goals
              before recommending anything operative.
            </p>
          </div>
          <ButtonRouterLink to="/consultation" variant="primary">
            Book an Appointment
          </ButtonRouterLink>
        </div>
      </Section>
    </>
  );
}

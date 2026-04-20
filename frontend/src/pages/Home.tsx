import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonRouterLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { HeroSlideshow } from '@/components/ui/HeroSlideshow';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { SectionProgress } from '@/components/ui/SectionProgress';
import { Seo } from '@/components/seo/Seo';
import { doctor } from '@/content/doctor';
import { heroImages, aboutPortrait } from '@/content/media';
import { services } from '@/content/services';
import { distinctions } from '@/content/distinctions';
import { Tag } from '@/components/ui/Tag';

// Anchor ids used by SectionProgress; each page section below wires the
// same id as its DOM `id` attribute so the rail can observe them.
const sections = [
  { id: 'home-top', label: 'Introduction' },
  { id: 'home-stats', label: 'At a glance' },
  { id: 'home-about', label: 'About the surgeon' },
  { id: 'home-procedures', label: 'Procedures' },
  { id: 'home-distinctions', label: 'Distinctions' },
  { id: 'home-consult', label: 'Consultation' },
];

function Hero() {
  return (
    <section
      id="home-top"
      aria-labelledby="hero-headline"
      className="relative bg-gradient-hero"
    >
      <Container className="py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow>Shifa International Hospital · Islamabad</Eyebrow>
            <h1 id="hero-headline" className="t-display mt-4 max-w-[18ch]">
              {doctor.heroHeadline}
            </h1>
            <p className="t-body-lg mt-6 max-w-[56ch] text-textSecondary">{doctor.heroLead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonRouterLink to="/consultation" variant="primary">
                Book an Appointment
              </ButtonRouterLink>
              <ButtonRouterLink to="/about" variant="secondary">
                About Dr. Siddiq
              </ButtonRouterLink>
            </div>
            <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-textSecondary">
              {doctor.proofPoints.map((point, i) => (
                <li key={point} className="flex items-center gap-3">
                  {i > 0 ? (
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border2" />
                  ) : null}
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-5">
            <HeroSlideshow images={heroImages} interval={5000} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stats() {
  return (
    <Section id="home-stats" tone="surface" size="sm" aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="sr-only">
        Practice at a glance
      </h2>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {[
          { n: 25, s: '', label: 'Years in practice' },
          { n: 1400, s: '+', label: 'Laparoscopic cases' },
          { n: 970, s: '+', label: 'Bariatric procedures' },
          { n: 9000, s: '+', label: 'Gall bladder surgeries' },
        ].map((stat) => (
          <div key={stat.label} className="text-center md:text-left">
            <div className="text-3xl font-medium tracking-tight text-primary md:text-4xl">
              <AnimatedCounter to={stat.n} suffix={stat.s} />
            </div>
            <p className="t-caption mt-2 text-textSecondary">{stat.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function AboutTeaser() {
  return (
    <Section id="home-about" tone="base" size="md">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <img
            src={aboutPortrait.src}
            alt={aboutPortrait.alt}
            width={800}
            height={1000}
            loading="lazy"
            decoding="async"
            className="w-full rounded-lg border border-border1 object-cover shadow-card"
          />
        </div>
        <div className="md:col-span-7">
          <Eyebrow>About the surgeon</Eyebrow>
          <h2 className="t-h1 mt-3 max-w-[16ch]">{doctor.fullName}</h2>
          <p className="t-caption mt-2 text-textMuted">{doctor.role}</p>
          <p className="t-caption text-textMuted">{doctor.credentials}</p>
          <p className="t-body-lg mt-6 max-w-[62ch] text-textSecondary">{doctor.bioShort}</p>
          <div className="mt-8">
            <ButtonRouterLink to="/about" variant="secondary">
              Read the full bio →
            </ButtonRouterLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

function FeaturedProcedures() {
  const featured = services.slice(0, 3);
  return (
    <Section
      id="home-procedures"
      tone="surface"
      size="md"
      aria-labelledby="featured-proc-heading"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>Surgical expertise</Eyebrow>
          <h2 id="featured-proc-heading" className="t-h1 mt-3 max-w-[22ch]">
            Procedures performed by Dr. Siddiq.
          </h2>
        </div>
        <ButtonRouterLink to="/procedures" variant="ghost">
          Explore All Surgical Services →
        </ButtonRouterLink>
      </div>
      {/* Informational cards, consistent with /procedures — no pseudo-hover. */}
      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((service) => (
          <li key={service.slug}>
            <Card as="article" padding="md" className="h-full">
              <div className="flex items-start justify-between gap-4">
                <Tag>{service.category}</Tag>
                <span className="text-lg font-medium text-primary">
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
  );
}

function DistinctionTeaser() {
  const lead = distinctions[0];
  return (
    <Section id="home-distinctions" tone="base" size="md">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <img
            src={lead.image}
            alt={lead.imageAlt}
            className="w-full rounded-lg border border-border1 object-cover shadow-card"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="md:col-span-7">
          <Eyebrow>Distinctions</Eyebrow>
          <h2 className="t-h1 mt-3 max-w-[20ch]">A shining legacy in endoscopic surgery.</h2>
          <p className="t-body-lg mt-5 max-w-[60ch] text-textSecondary">{lead.body}</p>
          <div className="mt-8">
            <ButtonRouterLink to="/distinctions" variant="secondary">
              See all distinctions →
            </ButtonRouterLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ConsultCta() {
  return (
    <section id="home-consult" className="bg-gradient-hero">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr,auto]">
          <div>
            <Eyebrow>Consultation</Eyebrow>
            <h2 className="t-h1 mt-3 max-w-[22ch]">Looking for a consultation?</h2>
            <p className="t-body mt-3 max-w-[60ch] text-textSecondary">
              First appointments are unhurried — we talk through your history, goals and the
              honest trade-offs before we discuss anything operative.
            </p>
          </div>
          <ButtonRouterLink to="/consultation" variant="primary">
            Book an Appointment
          </ButtonRouterLink>
        </div>
      </Container>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Seo path="/" schema="home" />
      <SectionProgress sections={sections} />
      <Hero />
      <Stats />
      <AboutTeaser />
      <FeaturedProcedures />
      <DistinctionTeaser />
      <ConsultCta />
    </>
  );
}

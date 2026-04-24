import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonRouterLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { HeroSlideshow } from '@/components/ui/HeroSlideshow';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { SectionProgress } from '@/components/ui/SectionProgress';
import { ProcedureDetailModal } from '@/components/ui/ProcedureDetailModal';
import { Seo } from '@/components/seo/Seo';
import { doctor } from '@/content/doctor';
import { heroImages, aboutPortrait } from '@/content/media';
import { services, type ServiceEntry } from '@/content/services';
import { distinctions } from '@/content/distinctions';
import { Tag } from '@/components/ui/Tag';
import { cn } from '@/lib/cn';

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
      <Container className="py-12 sm:py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <Eyebrow>Shifa International Hospital · Islamabad</Eyebrow>
            <h1 id="hero-headline" className="t-display mt-3 max-w-[18ch] sm:mt-4">
              {doctor.heroHeadline}
            </h1>
            <p className="t-body-lg mt-4 max-w-[56ch] text-textSecondary sm:mt-6">
              {doctor.heroLead}
            </p>
            {/* On phones the CTA pair stacks to full width; from sm up
                they sit inline. This avoids the two buttons cramming
                side-by-side below 375px. */}
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
              <ButtonRouterLink to="/consultation" variant="primary" className="w-full sm:w-auto">
                Book an Appointment
              </ButtonRouterLink>
              <ButtonRouterLink to="/about" variant="secondary" className="w-full sm:w-auto">
                About Dr. Siddiq
              </ButtonRouterLink>
            </div>
            <ul className="mt-8 flex flex-col gap-2 text-sm text-textSecondary sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
              {doctor.proofPoints.map((point, i) => (
                <li key={point} className="flex items-center gap-3">
                  {i > 0 ? (
                    <span
                      aria-hidden="true"
                      className="hidden h-1 w-1 rounded-full bg-border2 sm:inline-block"
                    />
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
      <div className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-4">
        {[
          { n: 25, s: '', label: 'Years in practice' },
          { n: 1400, s: '+', label: 'Laparoscopic cases' },
          { n: 970, s: '+', label: 'Bariatric procedures' },
          { n: 9000, s: '+', label: 'Gall bladder surgeries' },
        ].map((stat) => (
          <div key={stat.label} className="md:text-left">
            <div className="text-2xl font-medium tracking-tight text-primary sm:text-3xl md:text-4xl">
              <AnimatedCounter to={stat.n} suffix={stat.s} />
            </div>
            <p className="t-caption mt-1.5 text-textSecondary">{stat.label}</p>
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
          {/* Eager-loaded on purpose: on 390px viewports this portrait is
              the very next image after the hero and appears within ~1
              viewport of scroll. Leaving it lazy causes it to still be
              unresolved when the AboutTeaser section paints, producing a
              ~500px blank gap between the stats strip and the heading
              (the reserved aspect-ratio box with no pixels yet). */}
          <img
            src={aboutPortrait.src}
            alt={aboutPortrait.alt}
            width={800}
            height={1000}
            loading="eager"
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

function FeaturedProcedures({ onOpen }: { onOpen: (service: ServiceEntry) => void }) {
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
      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((service) => (
          <li key={service.slug} className="flex">
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
                <Tag>{service.category}</Tag>
                <span className="text-lg font-medium text-primary">
                  <AnimatedCounter to={service.volume} suffix="+" />
                </span>
              </div>
              <h3 className="mt-4 text-xl font-medium leading-snug">{service.title}</h3>
              <p className="t-body mt-2 text-textSecondary">{service.summary}</p>
              <span
                aria-hidden="true"
                className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-primary transition-transform duration-[220ms] ease-breathe group-hover:translate-x-0.5"
              >
                Learn more →
              </span>
            </button>
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
      <Container className="py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr,auto]">
          <div>
            <Eyebrow>Consultation</Eyebrow>
            <h2 className="t-h1 mt-3 max-w-[22ch]">Looking for a consultation?</h2>
            <p className="t-body mt-3 max-w-[60ch] text-textSecondary">
              First appointments are unhurried and personal — we take the time to understand
              your history, your goals, and the honest trade-offs of each option before anything
              operative is even discussed.
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
  );
}

export function Home() {
  const [active, setActive] = useState<ServiceEntry | null>(null);
  return (
    <>
      <Seo path="/" schema="home" />
      <SectionProgress sections={sections} />
      <Hero />
      <Stats />
      <AboutTeaser />
      <FeaturedProcedures onOpen={setActive} />
      <DistinctionTeaser />
      <ConsultCta />
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

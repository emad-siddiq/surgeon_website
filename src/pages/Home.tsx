/**
 * `/` route. Eight stacked sections: Hero (custom, with HeroSlideshow),
 * Stats (animated counters), AboutTeaser, FeaturedProcedures (top-3
 * services as ClickableCards → ProcedureDetailModal), DistinctionTeaser,
 * MediaTeaser (YouTube channel + podcast outbound cards), ReviewsTeaser
 * (aggregate + Google-review CTA), ConsultCta (a custom variant of
 * CtaBand with the SectionProgress anchor id `home-consult`).
 *
 * The page owns the procedure-detail modal state in `active`. The
 * SectionProgress rail (visible only at lg+) observes the section ids
 * declared in the `sections` array below.
 */
import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonRouterLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { HeroSlideshow } from '@/components/ui/HeroSlideshow';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { SectionProgress } from '@/components/ui/SectionProgress';
import { ProcedureDetailModal } from '@/components/ui/ProcedureDetailModal';
import { ClickableCard, LearnMoreHint } from '@/components/ui/ClickableCard';
import { Seo } from '@/components/seo/Seo';
import { doctor } from '@/content/doctor';
import { heroImages, aboutPortrait } from '@/content/media';
import { services, type ServiceEntry } from '@/content/services';
import { distinctions } from '@/content/distinctions';
import { mediaTeaser, youtubeChannel, podcast } from '@/content/teaching';
import {
  reviewsHeading,
  reviewsLead,
  reviewAggregate,
  googleReview,
  patientReviews,
} from '@/content/reviews';
import { ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';

// Anchor ids used by SectionProgress; each page section below wires the
// same id as its DOM `id` attribute so the rail can observe them.
const sections = [
  { id: 'home-top', label: 'Introduction' },
  { id: 'home-stats', label: 'At a glance' },
  { id: 'home-about', label: 'About the surgeon' },
  { id: 'home-procedures', label: 'Procedures' },
  { id: 'home-distinctions', label: 'Distinctions' },
  { id: 'home-media', label: 'Videos & podcast' },
  { id: 'home-reviews', label: 'Patient reviews' },
  { id: 'home-consult', label: 'Consultation' },
];

function Hero() {
  return (
    <section
      id="home-top"
      aria-labelledby="hero-headline"
      className="relative bg-surface"
    >
      <Container className="py-8 sm:py-12 md:py-20 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <Eyebrow>Shifa International Hospital · Islamabad</Eyebrow>
            <h1 id="hero-headline" className="t-display mt-3 max-w-measure-20 sm:mt-4">
              {doctor.heroHeadline}
            </h1>
            <p className="t-body-lg mt-4 max-w-measure-56 text-textSecondary sm:mt-6">
              {doctor.heroLead}
            </p>
            {/* On phones the CTA pair stacks to full width; from sm up
                they sit inline. This avoids the two buttons cramming
                side-by-side below 375px. */}
            <div className="mt-5 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
              <ButtonRouterLink to="/consultation" variant="primary" className="w-full sm:w-auto">
                Book an Appointment
              </ButtonRouterLink>
              <ButtonRouterLink to="/about" variant="secondary" className="w-full sm:w-auto">
                About Dr. Siddiq
              </ButtonRouterLink>
            </div>
            <ul className="mt-6 flex flex-row flex-wrap items-center gap-x-4 gap-y-2 text-sm text-textSecondary sm:mt-10 sm:gap-x-6">
              {doctor.proofPoints.map((point, i) => (
                <li key={point} className="flex items-center gap-3">
                  {i > 0 ? (
                    <span
                      aria-hidden="true"
                      className="inline-block h-1 w-1 rounded-full bg-border2"
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
    <Section
      id="home-stats"
      tone="surface"
      size="sm"
      className="py-6 md:py-8"
      aria-labelledby="stats-heading"
    >
      <h2 id="stats-heading" className="sr-only">
        Practice at a glance
      </h2>
      {/* Editorial stat row (Mailchimp-style via Mobbin): display-scale
          numerals in quiet ink, small muted captions, no card boxes.
          t-h1 keeps the numerals a step below the hero's t-display. */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-8 md:grid-cols-4">
        {[
          { n: 25, s: '', label: 'Years in practice' },
          { n: 1400, s: '+', label: 'Laparoscopic cases' },
          { n: 970, s: '+', label: 'Bariatric procedures' },
          { n: 9000, s: '+', label: 'Gall bladder surgeries' },
        ].map((stat) => (
          <div key={stat.label} className="md:text-left">
            <div className="t-h1 text-textPrimary">
              <AnimatedCounter to={stat.n} suffix={stat.s} />
            </div>
            <p className="t-caption mt-2 text-textMuted">{stat.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function AboutTeaser() {
  return (
    <Section id="home-about" tone="base" size="md" className="py-10 sm:py-12 md:py-16">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          {/* Wrapper owns the aspect-ratio + skeleton tone so the slot is
              never an empty white rectangle even if the image decode is
              late (previous eager-only fix still produced a ~400px blank
              gap on 390px cold loads — see history.md "home portrait"
              regressions). The source is a 2048×1536 landscape shot, so
              4/3 matches its intrinsic aspect; the previous `width={800}
              height={1000}` attributes lied and reserved a taller
              portrait slot than the image ever filled. fetchPriority +
              sync decode pull this above the hero slideshow's lazy
              candidates on mobile. */}
          <div className="relative w-full overflow-hidden rounded-lg border border-border1 bg-surface shadow-card aspect-[4/3]">
            <img
              src={aboutPortrait.src}
              alt={aboutPortrait.alt}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-7">
          <Eyebrow>About the surgeon</Eyebrow>
          <h2 className="t-h1 mt-3 max-w-measure-20">{doctor.fullName}</h2>
          <p className="t-caption mt-2 text-textMuted">{doctor.role}</p>
          <p className="t-caption text-textMuted">{doctor.credentials}</p>
          <p className="t-body-lg mt-6 max-w-measure-62 text-textSecondary">{doctor.bioShort}</p>
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
      className="py-10 sm:py-12 md:py-16"
      aria-labelledby="featured-proc-heading"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>Surgical expertise</Eyebrow>
          <h2 id="featured-proc-heading" className="t-h1 mt-3 max-w-measure-22">
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
            <ClickableCard
              onClick={() => onOpen(service)}
              ariaLabel={`Learn more about ${service.title}`}
            >
              <div className="flex items-start justify-between gap-4">
                <Tag>{service.category}</Tag>
                <span className="text-lg font-medium text-primary">
                  <AnimatedCounter to={service.volume} suffix="+" />
                </span>
              </div>
              <h3 className="mt-4 text-xl font-medium leading-snug">{service.title}</h3>
              <p className="t-body mt-2 text-textSecondary">{service.summary}</p>
              <LearnMoreHint />
            </ClickableCard>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function DistinctionTeaser() {
  const lead = distinctions[0];
  return (
    <Section id="home-distinctions" tone="base" size="md" className="py-10 sm:py-12 md:py-16">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          {/* Aspect-ratio wrapper + surface fill prevents an empty white
              rectangle when the image decode is late — same pattern as
              AboutTeaser above. The source (1280×850) matches 3/2.
              decoding="sync" mirrors the portrait treatment: async decode
              produced an empty paint at 390/834 captures because the
              off-main-thread decode hadn't landed by the time Playwright
              snapshotted the scrolled slice. sync forces the decode to
              complete before the frame commits. */}
          <div className="relative w-full overflow-hidden rounded-lg border border-border1 bg-surface shadow-card aspect-[3/2]">
            <img
              src={lead.image}
              alt={lead.imageAlt}
              loading="eager"
              decoding="sync"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-7">
          <Eyebrow>Distinctions</Eyebrow>
          <h2 className="t-h1 mt-3 max-w-measure-20">Recognition in endoscopic surgery.</h2>
          <p className="t-body-lg mt-5 max-w-measure-62 text-textSecondary">{lead.body}</p>
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

/**
 * Outbound media card — same shell as ClickableCard but a real <a>,
 * since both destinations (channel + podcast) live on YouTube.
 */
function MediaCard({
  href,
  title,
  body,
  cta,
  icon,
}: {
  href: string;
  title: string;
  body: string;
  cta: string;
  icon: 'play' | 'waveform';
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        'group flex h-full w-full flex-col rounded-lg border border-border1 bg-white p-6 text-left shadow-card ' +
        'transition-[transform,box-shadow,border-color] duration-[220ms] ease-breathe ' +
        'hover:-translate-y-1 hover:border-primary hover:shadow-raised ' +
        'focus-visible:border-primary focus-visible:outline-none'
      }
    >
      <span
        aria-hidden="true"
        className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-white ${
          icon === 'play' ? 'bg-[#FF0033]' : 'bg-accent'
        }`}
      >
        {icon === 'play' ? (
          <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            width={20}
            height={20}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
          >
            <path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4" />
          </svg>
        )}
      </span>
      <h3 className="mt-4 text-xl font-medium leading-snug">{title}</h3>
      <p className="t-body mt-2 text-textSecondary">{body}</p>
      <LearnMoreHint>{cta}</LearnMoreHint>
    </a>
  );
}

function MediaTeaser() {
  return (
    <Section
      id="home-media"
      tone="surface"
      size="md"
      className="py-10 sm:py-12 md:py-16"
      aria-labelledby="media-teaser-heading"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>{mediaTeaser.eyebrow}</Eyebrow>
          <h2 id="media-teaser-heading" className="t-h1 mt-3 max-w-measure-22">
            {mediaTeaser.heading}
          </h2>
        </div>
        <ButtonRouterLink to="/teaching" variant="ghost">
          {mediaTeaser.moreLink} →
        </ButtonRouterLink>
      </div>
      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <li className="flex">
          <MediaCard
            href={youtubeChannel.url}
            title={mediaTeaser.channelCard.title}
            body={mediaTeaser.channelCard.body}
            cta={mediaTeaser.channelCard.cta}
            icon="play"
          />
        </li>
        <li className="flex">
          <MediaCard
            href={podcast.playlistUrl}
            title={mediaTeaser.podcastCard.title}
            body={mediaTeaser.podcastCard.body}
            cta={mediaTeaser.podcastCard.cta}
            icon="waveform"
          />
        </li>
      </ul>
    </Section>
  );
}

/**
 * Patient-experience section. Quote grid renders only once the practice
 * supplies consent-backed quotes in content/reviews.ts (goal-state G3
 * forbids anything else); until then the section carries the aggregate
 * tile + the Google-review ask, which is the conversion we want anyway.
 */
function ReviewsTeaser() {
  return (
    <Section
      id="home-reviews"
      tone="base"
      size="md"
      className="py-10 sm:py-12 md:py-16"
      aria-labelledby="reviews-heading"
    >
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <Eyebrow>Patient experience</Eyebrow>
          <h2 id="reviews-heading" className="t-h1 mt-3 max-w-measure-20">
            {reviewsHeading}
          </h2>
          <p className="t-body-lg mt-5 max-w-measure-62 text-textSecondary">{reviewsLead}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink
              href={googleReview.url}
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              {googleReview.cta}
            </ButtonLink>
          </div>
          <p className="t-caption mt-4 text-textMuted">{googleReview.note}</p>
        </div>
        <div className="md:col-span-5">
          <Card tone="surface" padding="lg" className="text-center md:text-left">
            <p className="text-5xl font-medium tracking-tight text-primary md:text-6xl">
              {reviewAggregate.score}
              <span className="text-2xl text-textMuted md:text-3xl">
                {' '}
                / {reviewAggregate.outOf}
              </span>
            </p>
            <p className="t-body mt-3 text-textSecondary">{reviewAggregate.caption}</p>
          </Card>
        </div>
      </div>
      {patientReviews.length > 0 ? (
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {patientReviews.map((review) => (
            <li key={review.quote} className="flex">
              <Card as="figure" tone="surface" className="flex w-full flex-col">
                <blockquote className="t-body text-textPrimary">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption className="t-caption mt-4 text-textMuted">
                  {review.name}
                  {review.context ? ` · ${review.context}` : ''}
                </figcaption>
              </Card>
            </li>
          ))}
        </ul>
      ) : null}
    </Section>
  );
}

function ConsultCta() {
  return (
    <section id="home-consult" className="bg-surface">
      <Container className="py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr,auto]">
          <div>
            <Eyebrow>Consultation</Eyebrow>
            <h2 className="t-h1 mt-3 max-w-measure-22">Looking for a consultation?</h2>
            <p className="t-body mt-3 max-w-measure-62 text-textSecondary">
              First appointments are unhurried and personal. We take the time to understand
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
      <MediaTeaser />
      <ReviewsTeaser />
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

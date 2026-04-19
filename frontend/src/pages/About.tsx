import { Seo } from '@/components/seo/Seo';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Card } from '@/components/ui/Card';
import { ButtonLink, ButtonRouterLink } from '@/components/ui/Button';
import { doctor } from '@/content/doctor';
import { testimonials } from '@/content/testimonials';
import heroImage from '@/assets/images/main-slider/1.jpeg';
import videoSrc from '@/assets/videos/shifa-video.mp4';
import { useState } from 'react';

export function About() {
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <Seo
        title="About"
        description={doctor.bioShort}
        path="/about"
        schema="home"
      />

      <Section tone="cream" size="lg" aria-labelledby="about-heading">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <Eyebrow rule>{doctor.credentials}</Eyebrow>
            <h1
              id="about-heading"
              className="font-display-tight t-display mt-6 max-w-[14ch]"
            >
              {doctor.fullName}
            </h1>
            <p className="t-body-lg mt-6 max-w-[56ch] text-ink2">{doctor.bioShort}</p>
            {doctor.bioLong.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="t-body mt-6 max-w-[64ch] text-ink2">
                {paragraph}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonRouterLink to="/#consultation" variant="primary">
                Book a consultation
              </ButtonRouterLink>
              <ButtonLink href="#credentials" variant="secondary">
                See credentials
              </ButtonLink>
            </div>
          </div>
          <div className="md:col-span-6">
            <div className="relative overflow-hidden rounded-xl border border-border1">
              {playing ? (
                <video
                  className="aspect-video w-full bg-ink"
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                >
                  <source src={videoSrc} type="video/mp4" />
                  {/* TODO(content): provide a real captions track. */}
                  <track kind="captions" srcLang="en" label="English captions" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label="Play the introduction video"
                  className="relative block aspect-video w-full overflow-hidden bg-ink"
                >
                  <img
                    src={heroImage}
                    alt=""
                    className="h-full w-full object-cover opacity-80"
                    loading="eager"
                    decoding="async"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-clay text-paper shadow-raised">
                      <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section id="credentials" tone="cream" size="md">
        <Eyebrow rule>Credentials</Eyebrow>
        <h2 className="font-display t-h1 mt-4 max-w-[22ch]">
          Education &amp; training.
        </h2>
        <ul role="list" className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {doctor.education.map((item) => (
            <li key={item.title}>
              <Card padding="md" interactive>
                <Eyebrow>{item.title}</Eyebrow>
                <p
                  className="font-display mt-3 text-[22px]"
                  style={{ fontWeight: 500, lineHeight: 1.2 }}
                >
                  {item.detail}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="cream" size="md" aria-labelledby="about-testimonials">
        <Eyebrow rule>Patient stories</Eyebrow>
        <h2 id="about-testimonials" className="font-display t-h1 mt-4 max-w-[22ch]">
          In their words.
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-xl border border-border1 bg-paper p-8"
            >
              <blockquote className="font-display text-[20px] leading-snug text-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 text-ink2">
                <div className="font-medium text-ink">{t.name}</div>
                <div className="t-caption text-ink3">{t.caption}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </>
  );
}

import { useState } from 'react';
import { Seo } from '@/components/seo/Seo';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Card } from '@/components/ui/Card';
import { ButtonRouterLink } from '@/components/ui/Button';
import { doctor } from '@/content/doctor';
import { aboutPortrait, videos } from '@/content/media';

export function About() {
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <Seo title="About" description={doctor.bioShort} path="/about" schema="home" />

      <section className="bg-gradient-hero">
        <div className="mx-auto w-full max-w-container px-6 py-16 md:px-10 md:py-24">
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12">
            <div className="md:col-span-6">
              <Eyebrow>{doctor.credentials}</Eyebrow>
              <h1 className="t-display mt-4 max-w-[16ch]">{doctor.fullName}</h1>
              <p className="t-caption mt-3 text-textMuted">{doctor.role}</p>
              <p className="t-body-lg mt-6 max-w-[58ch] text-textSecondary">
                {doctor.bioShort}
              </p>
              {doctor.bioLong.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="t-body mt-5 max-w-[64ch] text-textSecondary"
                >
                  {paragraph}
                </p>
              ))}
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonRouterLink to="/consultation" variant="primary">
                  Book an Appointment
                </ButtonRouterLink>
                <ButtonRouterLink to="/procedures" variant="secondary">
                  See all procedures
                </ButtonRouterLink>
              </div>
            </div>
            <div className="md:col-span-6">
              <div className="relative overflow-hidden rounded-xl border border-border1 shadow-card">
                {playing ? (
                  <video
                    className="aspect-video w-full bg-textPrimary"
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                  >
                    <source src={videos.intro} type="video/mp4" />
                    {/* TODO(content): provide a real captions track. */}
                    <track kind="captions" srcLang="en" label="English captions" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    aria-label="Play the introduction video"
                    className="relative block aspect-video w-full overflow-hidden bg-textPrimary"
                  >
                    <img
                      src={aboutPortrait.src}
                      alt=""
                      className="h-full w-full object-cover opacity-85"
                      loading="eager"
                      decoding="async"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-raised">
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
        </div>
      </section>

      <Section tone="base" size="md">
        <Eyebrow>Credentials</Eyebrow>
        <h2 className="t-h1 mt-3 max-w-[22ch]">Education &amp; training.</h2>
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {doctor.education.map((item) => (
            <li key={item.title}>
              <Card padding="md" interactive className="h-full">
                <Eyebrow tone="muted">{item.title}</Eyebrow>
                <p className="mt-3 text-[20px] font-medium leading-snug">{item.detail}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" size="md">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr,auto]">
          <div>
            <Eyebrow>Expertise</Eyebrow>
            <h2 className="t-h2 mt-3 max-w-[24ch]">
              Minimally invasive surgery, end to end.
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-2 text-textSecondary sm:grid-cols-2">
              <li>• Laparoscopic bariatric surgery</li>
              <li>• General laparoscopic surgery</li>
              <li>• Colorectal procedures</li>
              <li>• Upper GI surgery</li>
              <li>• Revision bariatric surgery</li>
              <li>• Long-term post-operative follow-up</li>
            </ul>
          </div>
          <ButtonRouterLink to="/distinctions" variant="secondary">
            Distinctions & awards →
          </ButtonRouterLink>
        </div>
      </Section>
    </>
  );
}

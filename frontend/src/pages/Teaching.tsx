import { Seo } from '@/components/seo/Seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonLink, ButtonRouterLink } from '@/components/ui/Button';
import { CtaBand } from '@/components/ui/CtaBand';
import { teachingHeading, teachingLead, youtubeChannel } from '@/content/teaching';

export function Teaching() {
  return (
    <>
      <Seo
        title="Teaching"
        description="Dr. Ghulam Siddiq teaches the next generation of surgeons through his YouTube channel of narrated laparoscopic and bariatric cases, watched by surgeons across Pakistan and internationally."
        path="/teaching"
      />

      <PageHeader eyebrow="Education" title={teachingHeading} lead={teachingLead} />

      <Section tone="base" size="md" aria-labelledby="teaching-youtube">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <Eyebrow>Surgical education channel</Eyebrow>
            <h2 id="teaching-youtube" className="t-h1 mt-3 max-w-[24ch]">
              Narrated cases from the operating room.
            </h2>
            <p className="t-body-lg mt-5 max-w-[62ch] text-textSecondary">
              {youtubeChannel.body}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink
                href={youtubeChannel.url}
                variant="primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {youtubeChannel.cta}
              </ButtonLink>
              <ButtonRouterLink to="/procedures" variant="secondary">
                See procedures performed →
              </ButtonRouterLink>
            </div>
            <p className="t-caption mt-5 text-textMuted">{youtubeChannel.handle}</p>
          </div>
          <div className="md:col-span-5">
            <a
              href={youtubeChannel.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Dr. Siddiq's YouTube channel"
              className="group relative block overflow-hidden rounded-lg border border-border1 bg-textPrimary shadow-card"
            >
              <div className="aspect-video w-full bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#1a1a1a]">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#FF0033] text-white shadow-raised transition-transform duration-300 group-hover:scale-110">
                    <svg viewBox="0 0 24 24" width={28} height={28} fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium tracking-wide opacity-90">YouTube</span>
                  <span className="text-xs opacity-60">{youtubeChannel.handle}</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </Section>

      <CtaBand
        eyebrow="Workshops, conferences, leadership"
        headline={<>Active in regional &amp; international surgical societies.</>}
        body="Dr. Siddiq holds the presidency of POMSS (Pakistan Obesity and Metabolic Surgery Society), running training workshops in hospitals nationwide and leading international conferences. Read more on the Distinctions page."
        to="/distinctions"
        cta="Distinctions & awards →"
        variant="secondary"
      />
    </>
  );
}

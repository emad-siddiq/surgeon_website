import { useRef, useState } from 'react';
import { Seo } from '@/components/seo/Seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonRouterLink } from '@/components/ui/Button';
import { beforeAfterStories, type BeforeAfter } from '@/content/media';

function BeforeAfterSlider({ story }: { story: BeforeAfter }) {
  const [pct, setPct] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);

  const move = (clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    let next = ((clientX - rect.left) / rect.width) * 100;
    next = Math.max(4, Math.min(96, next));
    setPct(next);
  };

  return (
    <figure className="space-y-4">
      <div
        ref={frameRef}
        className="relative aspect-[4/5] select-none overflow-hidden rounded-lg border border-border1 shadow-card"
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          move(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.pressure > 0 || e.buttons === 1) move(e.clientX);
        }}
        role="slider"
        aria-label={`${story.beforeCaption} vs. ${story.afterCaption} — drag to compare`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setPct((p) => Math.max(4, p - 2));
          if (e.key === 'ArrowRight') setPct((p) => Math.min(96, p + 2));
        }}
      >
        <img
          src={story.before.src}
          alt={story.before.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <img
          src={story.after.src}
          alt={story.after.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 0 0 ${pct}%)` }}
        />
        <span
          aria-hidden="true"
          className="absolute left-4 top-4 rounded bg-textPrimary/80 px-2 py-0.5 text-xs font-medium tracking-wide text-white"
        >
          BEFORE
        </span>
        <span
          aria-hidden="true"
          className="absolute right-4 top-4 rounded bg-primary/90 px-2 py-0.5 text-xs font-medium tracking-wide text-white"
        >
          AFTER
        </span>
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white"
          style={{ left: `${pct}%`, boxShadow: '0 0 0 1px rgba(0,0,0,.18)' }}
          aria-hidden="true"
        >
          <span
            className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white shadow-raised"
            style={{ fontSize: 14, fontWeight: 600 }}
          >
            ↔
          </span>
        </div>
      </div>
      <figcaption className="grid grid-cols-2 gap-4 text-sm text-textSecondary">
        <span>{story.beforeCaption}</span>
        <span className="text-right">{story.afterCaption}</span>
      </figcaption>
    </figure>
  );
}

export function Transformations() {
  return (
    <>
      <Seo
        title="Transformations"
        description="Real patient outcomes after bariatric surgery with Dr. Ghulam Siddiq. Drag the slider to compare before and after — every photograph is shared with written consent."
        path="/transformations"
      />

      <PageHeader
        eyebrow="Patient outcomes"
        title={<>Twelve months, in their own bodies.</>}
        lead="Drag the handle to compare. Every photograph on this page is shared with written consent from the patient. Individual results vary — these are representative cases, not guarantees."
      />

      <Section tone="base" size="lg">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {beforeAfterStories.map((story, i) => (
            <BeforeAfterSlider key={i} story={story} />
          ))}
        </div>
      </Section>

      <section className="bg-gradient-hero">
        <div className="mx-auto w-full max-w-container px-6 py-14 md:px-10 md:py-20">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr,auto]">
            <div>
              <Eyebrow>Could this be you?</Eyebrow>
              <h2 className="t-h1 mt-3 max-w-[22ch]">
                Book a consultation and find out.
              </h2>
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

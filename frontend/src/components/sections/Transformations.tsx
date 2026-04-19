import { useState, useRef } from 'react';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import before1 from '@/assets/images/before_after/before_1.jpg';
import after1 from '@/assets/images/before_after/after_1.jpg';
import before2 from '@/assets/images/before_after/before_2.jpg';
import after2 from '@/assets/images/before_after/after_2.jpg';

interface Story {
  before: string;
  after: string;
  alt: string;
}

const stories: Story[] = [
  { before: before1, after: after1, alt: 'Patient, before and after bariatric surgery' },
  { before: before2, after: after2, alt: 'Patient, before and after bariatric surgery' },
];

function BeforeAfter({ story }: { story: Story }) {
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
      aria-label="Before and after comparison — drag to compare"
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
        src={story.before}
        alt={`${story.alt} (before)`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <img
        src={story.after}
        alt={`${story.alt} (after)`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 0 0 ${pct}%)` }}
      />
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
  );
}

export function Transformations() {
  return (
    <Section
      id="transformations"
      tone="base"
      size="lg"
      aria-labelledby="transformations-heading"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>Transformations</Eyebrow>
          <h2 id="transformations-heading" className="t-h1 mt-3 max-w-[22ch]">
            Real patient outcomes.
          </h2>
          <p className="t-body mt-4 max-w-[56ch] text-textSecondary">
            Drag the handle to compare before and after. Every photograph is shared with written
            consent from the patient.
          </p>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {stories.map((story, i) => (
          <BeforeAfter key={i} story={story} />
        ))}
      </div>
    </Section>
  );
}

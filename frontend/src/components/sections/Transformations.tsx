import { useState, useRef } from 'react';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { transformations } from '@/content/gallery';

function BeforeAfter({ story }: { story: (typeof transformations)[number] }) {
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
      className="relative mt-5 aspect-[4/5] select-none overflow-hidden rounded-lg"
      onPointerDown={(e) => {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => {
        if (e.pressure > 0 || e.buttons === 1) move(e.clientX);
      }}
      role="slider"
      aria-label="Before and after comparison"
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
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-paper"
        style={{ left: `${pct}%`, boxShadow: '0 0 0 1px rgba(31,27,23,.15)' }}
        aria-hidden="true"
      >
        <span
          className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink"
          style={{ boxShadow: '0 2px 10px rgba(0,0,0,.18)', fontSize: 12, fontWeight: 600 }}
        >
          ↔
        </span>
      </div>
    </div>
  );
}

export function Transformations() {
  const story = transformations[0];
  return (
    <Section
      id="transformations"
      tone="cream"
      size="md"
      aria-labelledby="transformations-heading"
    >
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <Eyebrow rule>Transformations</Eyebrow>
          <h2
            id="transformations-heading"
            className="font-display t-h1 mt-4 max-w-[20ch]"
          >
            Twelve months.
          </h2>
          <p className="t-body mt-4 max-w-[48ch] text-ink2">
            Drag the handle to compare. Every photograph on this page is shared with written
            consent from the patient.
          </p>
          <p className="t-caption mt-6 font-serif italic text-ink2">{story.caption}</p>
        </div>
        <div className="md:col-span-5">
          <BeforeAfter story={story} />
        </div>
      </div>
    </Section>
  );
}

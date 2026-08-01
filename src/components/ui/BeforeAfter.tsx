import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { cn } from '@/lib/cn';

export interface BeforeAfterProps {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  beforeCaption?: string;
  afterCaption?: string;
  className?: string;
}

/**
 * Before/after drag slider that sizes itself to the *before* image's
 * natural dimensions — no hardcoded aspect ratio. Each image can be
 * portrait, landscape, square; the container grows to match.
 *
 * Implementation:
 *   - The `before` image renders in normal flow with `height: auto` and
 *     `width: 100%`. It therefore defines the container's height and
 *     aspect ratio organically.
 *   - The `after` image is absolutely positioned on top and object-cover
 *     clipped from the left with `clipPath: inset(0 0 0 X%)`.
 *
 * This avoids fragile `aspect-[...]` classes that cropped images or
 * letterboxed them into a fixed frame.
 */
export function BeforeAfter({
  before,
  after,
  beforeCaption,
  afterCaption,
  className,
}: BeforeAfterProps) {
  const [pct, setPct] = useState(50);
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const setFromClientX = (clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.max(2, Math.min(98, next)));
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    (event.currentTarget as HTMLDivElement).setPointerCapture(event.pointerId);
    setDragging(true);
    setFromClientX(event.clientX);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setFromClientX(event.clientX);
  };

  const onPointerUp = () => setDragging(false);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setPct((p) => Math.max(2, p - 2));
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      setPct((p) => Math.min(98, p + 2));
    } else if (event.key === 'Home') {
      event.preventDefault();
      setPct(2);
    } else if (event.key === 'End') {
      event.preventDefault();
      setPct(98);
    }
  };

  return (
    <figure className={cn('space-y-3', className)}>
      <div
        ref={frameRef}
        role="slider"
        tabIndex={0}
        aria-label="Drag to compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
        aria-valuetext={`${Math.round(pct)}% after`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        className={cn(
          'group relative w-full cursor-ew-resize select-none overflow-hidden',
          'rounded-lg bg-surface shadow-card ring-1 ring-border1',
          'touch-pan-y',
        )}
      >
        {/*
          `before` renders in normal flow with `h-auto` + `w-full` so it
          determines the container's height and aspect ratio. Width /
          height attributes prevent layout shift while loading.
        */}
        <img
          src={before.src}
          alt={before.alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="block h-auto w-full select-none"
        />
        {/*
          `after` is overlaid with the exact container bounds. object-cover
          ensures it fills the container even if the after image has a
          slightly different intrinsic aspect ratio (patient photography
          is usually matched pairs, but pairs are not always pixel-perfect).
          clipPath reveals only the right-hand portion past the handle.
        */}
        <img
          src={after.src}
          alt={after.alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
          style={{ clipPath: `inset(0 0 0 ${pct}%)` }}
        />

        {/* Corner labels — quiet chips, bottom of the frame. */}
        <span
          aria-hidden="true"
          className={cn(
            'absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-textPrimary backdrop-blur-sm transition-opacity duration-200',
            dragging ? 'opacity-0' : 'opacity-100',
          )}
        >
          Before
        </span>
        <span
          aria-hidden="true"
          className={cn(
            'absolute bottom-3 right-3 rounded-full bg-primary/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-opacity duration-200',
            dragging ? 'opacity-0' : 'opacity-100',
          )}
        >
          After
        </span>

        {/* Divider + centered white pill handle. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 bottom-0 w-px bg-white/90"
          style={{
            left: `${pct}%`,
            boxShadow: '0 0 0 1px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.25)',
          }}
        >
          <span
            className={cn(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              'flex h-11 w-11 items-center justify-center rounded-full bg-white text-textPrimary',
              'shadow-raised ring-1 ring-border2 transition-transform duration-200 ease-breathe',
              'group-hover:scale-105 group-focus-visible:scale-105',
              dragging && 'scale-105',
            )}
          >
            <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true">
              <path
                d="M9.5 7.5L5 12l4.5 4.5M14.5 7.5L19 12l-4.5 4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      {(beforeCaption || afterCaption) && (
        <figcaption className="flex items-start justify-between gap-4 text-sm text-textSecondary">
          <span className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-textMuted">Before</span>
            <span className="mt-0.5 font-medium text-textPrimary">{beforeCaption}</span>
          </span>
          <span className="flex flex-col text-right">
            <span className="text-xs uppercase tracking-widest text-textMuted">After</span>
            <span className="mt-0.5 font-medium text-textPrimary">{afterCaption}</span>
          </span>
        </figcaption>
      )}
    </figure>
  );
}

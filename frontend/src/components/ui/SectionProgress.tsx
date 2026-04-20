import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/cn';

export interface SectionProgressItem {
  id: string;
  label: string;
}

interface SectionProgressProps {
  sections: SectionProgressItem[];
}

/**
 * Fixed vertical scroll rail shown on large screens. For each registered
 * section on the page it shows:
 *   - A filled dot when the section is currently in view
 *   - The section label alongside
 *   - A background bar with a filled segment reflecting overall page
 *     scroll progress (0–100%).
 *
 * The active section is determined with a single IntersectionObserver
 * over `rootMargin: '-30% 0px -60% 0px'`, which is a well-known trick for
 * "which section is closest to the top of the reader's viewport".
 *
 * Clicking a label scrolls smoothly to the section. Hidden below `lg`
 * because the rail would otherwise crowd narrow viewports; mobile users
 * already have the top nav.
 */
export function SectionProgress({ sections }: SectionProgressProps) {
  const ids = useMemo(() => sections.map((s) => s.id), [sections]);
  const [activeId, setActiveId] = useState<string>(ids[0] ?? '');
  const [progress, setProgress] = useState(0);

  // Track overall scroll progress (0..1).
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Track which section is active using an IntersectionObserver.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        // Whichever tracked section has the largest intersection ratio wins.
        let bestId = activeId;
        let bestRatio = -1;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestId) setActiveId(bestId);
      },
      {
        // Weight the section whose top is near the top third of the viewport.
        rootMargin: '-30% 0px -60% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // `activeId` is deliberately excluded so we don't re-run on every change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    event.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <aside
      aria-label="Page sections"
      className="pointer-events-none fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <div className="pointer-events-auto relative flex flex-col gap-5 py-2">
        {/* background track */}
        <span
          aria-hidden="true"
          className="absolute left-[5px] top-2 bottom-2 w-px bg-border1"
        />
        {/* filled portion based on overall scroll progress */}
        <span
          aria-hidden="true"
          className="absolute left-[5px] top-2 w-px origin-top bg-primary transition-[height] duration-300 ease-breathe"
          style={{ height: `calc(${progress * 100}% - ${progress * 16}px)` }}
        />
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => handleClick(e, section.id)}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'group relative z-10 flex items-center gap-3 text-xs transition-colors duration-200',
                isActive ? 'text-primary' : 'text-textMuted hover:text-primary',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'inline-flex h-[11px] w-[11px] shrink-0 items-center justify-center rounded-full border-2 bg-white transition-all duration-200',
                  isActive
                    ? 'border-primary bg-primary scale-110 shadow-[0_0_0_3px_rgba(13,110,253,0.15)]'
                    : 'border-border2 group-hover:border-primary',
                )}
              />
              <span
                className={cn(
                  'whitespace-nowrap rounded-full bg-white/80 px-2 py-0.5 backdrop-blur-sm transition-all duration-200',
                  isActive
                    ? 'font-medium opacity-100'
                    : 'opacity-0 group-hover:opacity-100',
                )}
              >
                {section.label}
              </span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}

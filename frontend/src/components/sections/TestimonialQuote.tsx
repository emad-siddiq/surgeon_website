import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { testimonials } from '@/content/testimonials';

export function TestimonialQuote() {
  const quote = testimonials[0];
  return (
    <Section tone="cream" size="sm">
      <figure className="relative rounded-xl border border-[rgba(75,69,102,0.10)] bg-lilac50 p-10 md:p-14">
        <Eyebrow rule>A patient, twelve months later</Eyebrow>
        <blockquote
          className="font-display mt-6"
          style={{
            fontSize: 'clamp(24px, 2.4vw, 34px)',
            lineHeight: 1.22,
            fontWeight: 420,
            color: '#1F1B17',
          }}
        >
          “{quote.quote}”
        </blockquote>
        <figcaption className="mt-8 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-10 w-10 rounded-full"
            style={{ background: 'radial-gradient(circle at 35% 30%, #F3D4C1, #B2553A)' }}
          />
          <div>
            <div className="font-medium text-ink">{quote.name}</div>
            <div className="t-caption text-ink3">{quote.caption}</div>
          </div>
        </figcaption>
      </figure>
    </Section>
  );
}

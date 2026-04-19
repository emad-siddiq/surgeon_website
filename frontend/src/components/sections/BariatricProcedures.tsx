import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { bariatricProcedures } from '@/content/services';

export function BariatricProcedures() {
  return (
    <Section id="bariatric" tone="cream" size="md" aria-labelledby="bariatric-heading">
      <Eyebrow rule>Bariatric procedures</Eyebrow>
      <h2
        id="bariatric-heading"
        className="font-display t-h1 mt-4 max-w-[22ch]"
      >
        Two routes, both chosen carefully.
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
        {bariatricProcedures.map((proc) => (
          <article key={proc.number} className="grid grid-cols-[auto_1fr] items-start gap-6">
            <span
              aria-hidden="true"
              className="font-display text-ink3"
              style={{
                fontSize: 'clamp(48px, 5vw, 72px)',
                lineHeight: 1,
                fontVariationSettings: '"opsz" 144, "SOFT" 20',
              }}
            >
              {proc.number}
            </span>
            <div>
              <h3 className="font-display t-h3">{proc.title}</h3>
              <p className="t-body mt-3 text-ink2">{proc.body}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

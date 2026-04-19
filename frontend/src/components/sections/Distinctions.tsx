import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Card } from '@/components/ui/Card';
import { distinctions, distinctionsHeading } from '@/content/distinctions';

export function Distinctions() {
  return (
    <Section id="distinctions" tone="base" size="md" aria-labelledby="distinctions-heading">
      <Eyebrow>Distinctions</Eyebrow>
      <h2 id="distinctions-heading" className="t-h1 mt-3 max-w-[22ch]">
        {distinctionsHeading}
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {distinctions.map((d) => (
          <Card
            key={d.title}
            as="article"
            tone="surface"
            padding="lg"
            interactive
            className="relative overflow-hidden"
          >
            {d.stat ? (
              <div className="mb-4 flex items-baseline gap-3">
                <span className="text-4xl font-medium tracking-tight text-primary">
                  {d.stat.value}
                </span>
                <span className="t-caption uppercase tracking-widest text-textMuted">
                  {d.stat.label}
                </span>
              </div>
            ) : null}
            <h3 className="t-h3 font-medium">{d.title}</h3>
            <p className="t-body mt-3 text-textSecondary">{d.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

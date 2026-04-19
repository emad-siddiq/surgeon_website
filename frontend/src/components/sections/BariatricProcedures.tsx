import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Card } from '@/components/ui/Card';
import { bariatricIntro, bariatricProcedures } from '@/content/services';

export function BariatricProcedures() {
  return (
    <Section id="bariatric" tone="surface" size="lg" aria-labelledby="bariatric-heading">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Eyebrow>Bariatric Surgery</Eyebrow>
          <h2 id="bariatric-heading" className="t-h1 mt-3 max-w-[18ch]">
            {bariatricIntro.subtitle}
          </h2>
          {bariatricIntro.body.map((p, i) => (
            <p
              key={i}
              className={i === 0 ? 't-body-lg mt-6 text-textSecondary' : 't-body mt-4 text-textSecondary'}
            >
              {p}
            </p>
          ))}
        </div>
        <div className="md:col-span-7">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {bariatricProcedures.map((proc) => (
              <li key={proc.number}>
                <Card padding="md" interactive className="h-full">
                  <span
                    aria-hidden="true"
                    className="text-sm font-medium tracking-widest text-primary"
                  >
                    {proc.number}
                  </span>
                  <h3 className="mt-2 text-[18px] font-medium leading-snug">{proc.title}</h3>
                  <p className="t-body mt-2 text-textSecondary">{proc.body}</p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

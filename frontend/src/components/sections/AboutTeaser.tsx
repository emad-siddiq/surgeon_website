import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonRouterLink } from '@/components/ui/Button';
import { doctor } from '@/content/doctor';

export function AboutTeaser() {
  return (
    <Section id="about" tone="cream" size="md">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Eyebrow rule>About</Eyebrow>
          <h2 className="font-display t-h1 mt-4 max-w-[16ch]">{doctor.fullName}</h2>
          <p className="t-caption mt-3 text-ink3">{doctor.credentials}</p>
        </div>
        <div className="md:col-span-7">
          <blockquote
            className="font-display"
            style={{
              fontSize: 'clamp(22px, 2.2vw, 30px)',
              lineHeight: 1.25,
              fontWeight: 420,
              color: '#1F1B17',
            }}
          >
            {doctor.bioShort}
          </blockquote>
          <div className="mt-8">
            <ButtonRouterLink to="/about" variant="secondary">
              Read the full bio
            </ButtonRouterLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

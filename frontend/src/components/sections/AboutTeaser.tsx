import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonRouterLink } from '@/components/ui/Button';
import { doctor } from '@/content/doctor';

export function AboutTeaser() {
  return (
    <Section id="about" tone="base" size="md">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Eyebrow>About</Eyebrow>
          <h2 className="t-h1 mt-3 max-w-[14ch]">{doctor.fullName}</h2>
          <p className="t-caption mt-3 text-textMuted">{doctor.role}</p>
          <p className="t-caption mt-1 text-textMuted">{doctor.credentials}</p>
        </div>
        <div className="md:col-span-7">
          <p className="t-body-lg max-w-[62ch] text-textSecondary">{doctor.bioShort}</p>
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

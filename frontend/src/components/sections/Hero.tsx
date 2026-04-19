import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonRouterLink, ButtonLink } from '@/components/ui/Button';
import { doctor } from '@/content/doctor';
import portrait from '@/assets/images/main-slider/1.jpeg';

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-headline" className="relative bg-gradient-hero">
      <Container className="py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow>Shifa International Hospital · Islamabad</Eyebrow>
            <h1 id="hero-headline" className="t-display mt-4 max-w-[18ch]">
              {doctor.heroHeadline}
            </h1>
            <p className="t-body-lg mt-6 max-w-[56ch] text-textSecondary">{doctor.heroLead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonRouterLink to="/#consultation" variant="primary">
                Book an Appointment
              </ButtonRouterLink>
              <ButtonLink href="/about" variant="secondary">
                About Dr. Siddiq
              </ButtonLink>
            </div>
            <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-textSecondary">
              {doctor.proofPoints.map((point, i) => (
                <li key={point} className="flex items-center gap-3">
                  {i > 0 ? (
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border2" />
                  ) : null}
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-5">
            <img
              src={portrait}
              alt={`Portrait of ${doctor.fullName}`}
              width={800}
              height={1000}
              loading="eager"
              decoding="async"
              className="aspect-[4/5] w-full rounded-xl border border-border1 object-cover shadow-card"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonLink, ButtonRouterLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Aurora } from '@/components/aurora/Aurora';
import { doctor } from '@/content/doctor';
import portrait from '@/assets/images/main-slider/1.jpeg';

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-headline" className="relative">
      <Container className="py-12 md:py-20">
        <div className="relative overflow-hidden rounded-xl border border-border1 bg-cream grain">
          <Aurora />
          <div className="relative z-[2] grid grid-cols-1 items-center gap-10 px-8 py-16 md:grid-cols-12 md:px-14 md:py-24">
            <div className="md:col-span-7">
              <Eyebrow rule>{doctor.heroEyebrow}</Eyebrow>
              <h1
                id="hero-headline"
                className="font-display-tight t-display mt-6 max-w-[14ch]"
              >
                {doctor.heroHeadline}
              </h1>
              <p className="t-body-lg mt-6 max-w-[48ch] text-ink2">{doctor.heroLead}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ButtonRouterLink to="/#consultation" variant="primary">
                  Book a consultation
                </ButtonRouterLink>
                <ButtonLink href="/about" variant="secondary">
                  Read the bio
                </ButtonLink>
              </div>
              <ul className="t-caption mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-ink3">
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
              <div className="relative">
                <picture>
                  <img
                    src={portrait}
                    alt={`Portrait of ${doctor.fullName}`}
                    width={800}
                    height={1000}
                    loading="eager"
                    decoding="async"
                    className="aspect-[4/5] w-full rounded-lg border border-border1 object-cover"
                  />
                </picture>
                <Card className="absolute -bottom-5 -left-5 hidden w-[240px] md:block" padding="sm">
                  <Eyebrow rule>Today</Eyebrow>
                  <p
                    className="font-display mt-2 text-[18px]"
                    style={{ fontWeight: 500, lineHeight: 1.2 }}
                  >
                    Three consultation slots open
                  </p>
                  <p className="t-caption mt-1 text-ink3">Tue · Wed · Fri mornings</p>
                  <ButtonRouterLink to="/#consultation" variant="ghost" className="-ml-3 mt-2">
                    Reserve →
                  </ButtonRouterLink>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

import { Seo } from '@/components/seo/Seo';
import { Section } from '@/components/ui/Section';
import { ButtonRouterLink } from '@/components/ui/Button';

export function NotFound() {
  return (
    <>
      <Seo title="Not found" path="/404" />
      <Section tone="cream" size="lg">
        <p className="t-eyebrow text-ink3">404</p>
        <h1 className="font-display-tight t-display mt-6 max-w-[18ch]">
          We couldn’t find that page.
        </h1>
        <p className="t-body-lg mt-5 max-w-[52ch] text-ink2">
          The link may be out of date, or we may have moved the content. The main site is a
          single page — you’ll find everything from the top.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonRouterLink to="/" variant="primary">
            Return home
          </ButtonRouterLink>
          <ButtonRouterLink to="/#consultation" variant="secondary">
            Book a consultation
          </ButtonRouterLink>
        </div>
      </Section>
    </>
  );
}

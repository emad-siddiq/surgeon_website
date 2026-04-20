import { Seo } from '@/components/seo/Seo';
import { Section } from '@/components/ui/Section';
import { ButtonRouterLink } from '@/components/ui/Button';
import { primaryNav } from '@/content/nav';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <>
      <Seo title="Not found" path="/404" />
      <Section tone="base" size="lg">
        <p className="t-eyebrow text-textMuted">404</p>
        <h1 className="t-display mt-6 max-w-[18ch]">We couldn’t find that page.</h1>
        <p className="t-body-lg mt-5 max-w-[52ch] text-textSecondary">
          The link may be out of date or the content may have moved. Try one of these instead:
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {primaryNav.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="inline-flex text-primary hover:text-primaryHover">
                {item.label} →
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonRouterLink to="/" variant="primary">
            Return home
          </ButtonRouterLink>
          <ButtonRouterLink to="/consultation" variant="secondary">
            Book an Appointment
          </ButtonRouterLink>
        </div>
      </Section>
    </>
  );
}

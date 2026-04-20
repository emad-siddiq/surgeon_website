import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Logo } from './Logo';
import { contact } from '@/content/contact';
import { doctor } from '@/content/doctor';
import { primaryNav, secondaryNav } from '@/content/nav';

function SocialIcon({ kind }: { kind: 'facebook' | 'instagram' | 'youtube' }) {
  const paths = {
    facebook:
      'M22 12a10 10 0 1 0-11.56 9.88v-6.98H8v-2.9h2.44V9.84c0-2.41 1.43-3.74 3.63-3.74 1.05 0 2.15.19 2.15.19v2.36h-1.21c-1.2 0-1.57.74-1.57 1.5v1.8h2.67l-.43 2.9h-2.24v6.98A10 10 0 0 0 22 12Z',
    instagram:
      'M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.43.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.43.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.43-.37-1.06-.42-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.17 1.06-.37 2.23-.42C8.42 2.21 8.8 2.2 12 2.2Zm0 2.16c-3.14 0-3.52.01-4.76.07-.98.05-1.51.22-1.86.36-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.35-.31.88-.36 1.86-.06 1.24-.07 1.62-.07 4.76s.01 3.52.07 4.76c.05.98.22 1.51.36 1.86.18.47.4.8.75 1.15.35.35.68.57 1.15.75.35.14.88.31 1.86.36 1.24.06 1.62.07 4.76.07s3.52-.01 4.76-.07c.98-.05 1.51-.22 1.86-.36.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.35.31-.88.36-1.86.06-1.24.07-1.62.07-4.76s-.01-3.52-.07-4.76c-.05-.98-.22-1.51-.36-1.86-.18-.47-.4-.8-.75-1.15-.35-.35-.68-.57-1.15-.75-.35-.14-.88-.31-1.86-.36-1.24-.06-1.62-.07-4.76-.07Zm0 3.68a3.96 3.96 0 1 1 0 7.92 3.96 3.96 0 0 1 0-7.92Zm0 2.16a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Zm5.03-2.4a.92.92 0 1 1-1.84 0 .92.92 0 0 1 1.84 0Z',
    youtube:
      'M23.5 6.2a3 3 0 0 0-2.1-2.12C19.55 3.6 12 3.6 12 3.6s-7.55 0-9.4.48A3 3 0 0 0 .5 6.2C0 8.06 0 12 0 12s0 3.94.5 5.8a3 3 0 0 0 2.1 2.12c1.85.48 9.4.48 9.4.48s7.55 0 9.4-.48a3 3 0 0 0 2.1-2.12c.5-1.86.5-5.8.5-5.8s0-3.94-.5-5.8ZM9.6 15.58V8.42L15.82 12 9.6 15.58Z',
  };
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor" aria-hidden="true">
      <path d={paths[kind]} />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gradient-footer">
      <Container className="py-14 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-[42ch] text-textSecondary">
              {doctor.role}. {doctor.tagline}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={contact.social.facebook}
                aria-label="Dr. Ghulam Siddiq on Facebook"
                target="_blank"
                rel="noreferrer"
                className="text-textSecondary hover:text-primary"
              >
                <SocialIcon kind="facebook" />
              </a>
              <a
                href={contact.social.instagram}
                aria-label="Dr. Ghulam Siddiq on Instagram"
                target="_blank"
                rel="noreferrer"
                className="text-textSecondary hover:text-primary"
              >
                <SocialIcon kind="instagram" />
              </a>
              <a
                href={contact.social.youtube}
                aria-label="Dr. Ghulam Siddiq on YouTube"
                target="_blank"
                rel="noreferrer"
                className="text-textSecondary hover:text-primary"
              >
                <SocialIcon kind="youtube" />
              </a>
            </div>
          </div>
          <nav aria-label="Footer sitemap" className="min-w-0">
            <p className="t-eyebrow text-textMuted">Explore</p>
            <ul className="mt-3 space-y-2 text-textSecondary">
              {[...primaryNav, ...secondaryNav].map((item) => (
                <li key={item.to}>
                  <Link className="hover:text-primary" to={item.to}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="min-w-0">
            <p className="t-eyebrow text-textMuted">Visit</p>
            <ul className="mt-3 space-y-2 text-textSecondary">
              <li>{contact.clinic.name}</li>
              <li>{contact.clinic.area}</li>
              <li>
                <a className="hover:text-primary" href={`tel:${contact.phone.tel}`}>
                  {contact.phone.display}
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="hr-soft my-10" />
        <div className="grid grid-cols-1 gap-4 text-sm text-textMuted md:grid-cols-[auto,1fr] md:items-start">
          <p className="md:whitespace-nowrap">
            © {year} {doctor.fullName}. All rights reserved.
          </p>
          <p className="md:text-right">
            This website contains information targeted to a wide range of audiences and could
            contain product details not accessible or valid in your country. Nothing on this site
            substitutes advice from a licensed clinician.
          </p>
        </div>
      </Container>
    </footer>
  );
}

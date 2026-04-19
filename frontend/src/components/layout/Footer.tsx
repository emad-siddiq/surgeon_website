import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Logo } from './Logo';
import { contact } from '@/content/contact';
import { doctor } from '@/content/doctor';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-cream">
      <Container className="py-14 md:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div>
            <Logo />
            <p className="t-caption mt-4 max-w-[30ch] text-ink3">
              Bariatric &amp; laparoscopic surgery. Karachi, by appointment.
            </p>
          </div>
          <nav aria-label="Footer practice" className="min-w-0">
            <Eyebrow>Practice</Eyebrow>
            <ul className="mt-3 space-y-2 text-ink2">
              <li>
                <a className="hover:text-clayDark" href="/about">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-clayDark" href="/#services">
                  Procedures
                </a>
              </li>
              <li>
                <a className="hover:text-clayDark" href="/#consultation">
                  Consultation
                </a>
              </li>
            </ul>
          </nav>
          <div className="min-w-0">
            <Eyebrow>Visit</Eyebrow>
            <ul className="mt-3 space-y-2 text-ink2">
              <li>{contact.clinic.name}</li>
              <li>{contact.clinic.area}</li>
              <li>{contact.hours.days} · AM</li>
            </ul>
          </div>
          <div className="min-w-0">
            <Eyebrow>Reach</Eyebrow>
            <ul className="mt-3 space-y-2 text-ink2">
              <li>
                <a className="hover:text-clayDark" href={`tel:${contact.phone.tel}`}>
                  {contact.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-ink underline underline-offset-[4px] decoration-clay"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="hr-soft my-10" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-serif italic text-ink2" style={{ fontSize: '15px' }}>
            {doctor.tagline}
          </p>
          <p className="t-caption text-ink3">
            © {year} {doctor.fullName} · All rights reserved
          </p>
        </div>
      </Container>
    </footer>
  );
}

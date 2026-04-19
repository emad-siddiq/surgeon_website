import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { contact } from '@/content/contact';

export function Location() {
  return (
    <Section id="location" tone="base" size="lg" aria-labelledby="location-heading">
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Eyebrow>Location</Eyebrow>
          <h2 id="location-heading" className="t-h1 mt-3 max-w-[18ch]">
            Visit Shifa International Hospital.
          </h2>
          <p className="t-body-lg mt-5 max-w-[48ch] text-textSecondary">
            A state-of-the-art facility in the heart of Islamabad combining modern medical
            technology with experienced healthcare professionals — Dr. Siddiq has operated here
            for over two decades.
          </p>
          <dl className="mt-8 grid grid-cols-1 gap-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-textMuted">Hospital</dt>
              <dd className="mt-1 font-medium text-textPrimary">{contact.clinic.name}</dd>
            </div>
            <div>
              <dt className="text-textMuted">Address</dt>
              <dd className="mt-1 font-medium text-textPrimary">{contact.clinic.fullAddress}</dd>
            </div>
            <div>
              <dt className="text-textMuted">Hours</dt>
              <dd className="mt-1 font-medium text-textPrimary">
                {contact.hours.days} · {contact.hours.time}
              </dd>
            </div>
            <div>
              <dt className="text-textMuted">Phone</dt>
              <dd className="mt-1 font-medium text-textPrimary">
                <a className="hover:text-primary" href={`tel:${contact.phone.tel}`}>
                  {contact.phone.display}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="md:col-span-7">
          <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border1 shadow-card">
            <iframe
              title={`Map of ${contact.clinic.name}`}
              src={contact.clinic.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

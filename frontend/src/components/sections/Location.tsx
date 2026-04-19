import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { contact } from '@/content/contact';

export function Location() {
  return (
    <Section id="location" tone="cream" size="md" aria-labelledby="location-heading">
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Eyebrow rule>Location</Eyebrow>
          <h2
            id="location-heading"
            className="font-display t-h1 mt-4 max-w-[16ch]"
          >
            A quiet room in Clifton.
          </h2>
          <dl className="t-body mt-8 grid grid-cols-2 gap-6">
            <div>
              <dt className="t-caption text-ink3">Clinic</dt>
              <dd className="mt-1 text-ink">{contact.clinic.name}</dd>
            </div>
            <div>
              <dt className="t-caption text-ink3">Area</dt>
              <dd className="mt-1 text-ink">{contact.clinic.area}</dd>
            </div>
            <div>
              <dt className="t-caption text-ink3">Hours</dt>
              <dd className="mt-1 text-ink">
                {contact.hours.days} · {contact.hours.time}
              </dd>
            </div>
            <div>
              <dt className="t-caption text-ink3">Phone</dt>
              <dd className="mt-1 text-ink">
                <a className="hover:text-clayDark" href={`tel:${contact.phone.tel}`}>
                  {contact.phone.display}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="md:col-span-7">
          <div
            className="aspect-[4/3] overflow-hidden rounded-lg border border-border1"
            style={{ filter: 'grayscale(0.35) contrast(0.95) brightness(1.05)' }}
          >
            <iframe
              title={`Map of ${contact.clinic.name}`}
              src={contact.clinic.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

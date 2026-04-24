import { Seo } from '@/components/seo/Seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BookingActions } from '@/components/ui/BookingActions';
import { contact } from '@/content/contact';
import { videos } from '@/content/media';

export function Location() {
  return (
    <>
      <Seo
        title="Location"
        description={`Dr. Ghulam Siddiq consults at ${contact.clinic.name}, ${contact.clinic.area}. ${contact.hours.days}, ${contact.hours.time}.`}
        path="/location"
        schema="home"
      />

      <PageHeader
        eyebrow="Location"
        title={<>Shifa International Hospitals: setting standards in healthcare excellence.</>}
        lead="Visit Shifa International Hospital in Islamabad, where clinical excellence meets compassionate, patient-first care. The facility pairs modern medical technology with a seasoned team of healthcare professionals — and Dr. Siddiq has operated here for over two decades."
        actions={<BookingActions />}
      />

      {/* Video first — sets the scene before the practical directions. */}
      <Section tone="base" size="md">
        <Eyebrow>Inside the hospital</Eyebrow>
        <h2 className="t-h2 mt-3 max-w-[24ch]">A brief look at the facility.</h2>
        <div className="mt-8 overflow-hidden rounded-lg border border-border1 shadow-card">
          <video
            className="aspect-video w-full bg-textPrimary"
            src={videos.clinicLoop}
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            aria-label="Ambient loop of Shifa International Hospital interiors"
          />
        </div>
      </Section>

      {/* Directions — address and map together. */}
      <Section tone="surface" size="md">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Visit</Eyebrow>
            <h2 className="t-h1 mt-3 max-w-[18ch]">Come see us in Islamabad.</h2>
            <dl className="mt-8 grid grid-cols-1 gap-6 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-textMuted">Hospital</dt>
                <dd className="mt-1 font-medium text-textPrimary">{contact.clinic.name}</dd>
              </div>
              <div>
                <dt className="text-textMuted">Address</dt>
                <dd className="mt-1 font-medium text-textPrimary">
                  {contact.clinic.fullAddress}
                </dd>
              </div>
              <div>
                <dt className="text-textMuted">Hours</dt>
                <dd className="mt-1 font-medium text-textPrimary">
                  {contact.hours.days}
                  <br />
                  {contact.hours.time}
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
    </>
  );
}

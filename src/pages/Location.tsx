/**
 * `/location` route. PageHeader (with <BookingActions> in its CTA slot)
 * → a hospital ambient-loop video → a two-column "Visit" section with
 * address/hours/phone on the left and an embedded Google Maps iframe +
 * "Get directions" deep-link on the right.
 *
 * The directions URL targets raw lat/lng (not a Places lookup) so it
 * still resolves if Google's Places index loses or renames the clinic.
 * Constants live just above the component.
 */
import { Seo } from '@/components/seo/Seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BookingActions } from '@/components/ui/BookingActions';
import { contact } from '@/content/contact';
import { videos } from '@/content/media';

/**
 * Deep-link into Google Maps directions targeting the clinic's lat/lng.
 * `api=1` is the documented Maps URL scheme — opens the native app on
 * iOS/Android and the maps.google.com web view on desktop. Keep the
 * destination as raw coordinates so it does not depend on the Google
 * Places index resolving "Shifa International Hospital".
 */
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${contact.clinic.geo.lat},${contact.clinic.geo.lng}`;

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
        title={<>Shifa International Hospital, Islamabad.</>}
        lead="Every consultation, operation and follow-up visit takes place at Shifa International Hospital, Islamabad."
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
            controls
            controlsList="nodownload"
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
            <a
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primaryHover"
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}

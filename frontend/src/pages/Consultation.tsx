import { Seo } from '@/components/seo/Seo';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Card } from '@/components/ui/Card';
import { BookingActions } from '@/components/ui/BookingActions';
import { Section } from '@/components/ui/Section';
import { contact, bookingLine } from '@/content/contact';
import { doctor } from '@/content/doctor';

/**
 * The practice books consultations through two channels only:
 *   1. WhatsApp the hospital (preferred)
 *   2. Call the hospital switchboard
 *
 * Shifa is a large hospital and the switchboard may offer alternative
 * consultants. We do not want to lecture the patient about that, but we
 * do want the name "Dr. Ghulam Siddiq" to stick in their mind before
 * they start the conversation. Hence the clear, calm "request Dr.
 * Ghulam Siddiq by name" line near both CTAs, and the "What to say"
 * card below for patients who want a literal script.
 */
export function Consultation() {
  return (
    <>
      <Seo
        title="Book a consultation"
        description={`Book a consultation with ${doctor.fullName} at ${contact.clinic.name}. WhatsApp or call the hospital and request Dr. Siddiq by name.`}
        path="/consultation"
      />

      <section className="bg-gradient-hero">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <Eyebrow>Book a consultation</Eyebrow>
              <h1 className="t-display mt-3 max-w-[20ch] sm:mt-4">
                Two ways to reach the practice.
              </h1>
              <p className="t-body-lg mt-4 max-w-[56ch] text-textSecondary sm:mt-6">
                All consultations are booked through Shifa International Hospital&rsquo;s
                main line. WhatsApp is usually the fastest route &mdash; messages reach
                the appointments desk directly and are answered during working hours. If
                you&rsquo;d rather speak to someone, a phone call works just as well.
              </p>

              <div className="mt-8">
                <BookingActions />
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-textSecondary sm:mt-8">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-primary"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
                <span>
                  <span className="font-medium text-textPrimary">A small note:</span>{' '}
                  {bookingLine} Shifa is a large hospital with many consultants &mdash;
                  naming Dr. Siddiq up front makes scheduling straightforward.
                </span>
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-6 text-sm text-textSecondary">
                <div>
                  <dt className="text-textMuted">Where</dt>
                  <dd className="mt-1 font-medium text-textPrimary">
                    {contact.clinic.name}
                  </dd>
                  <dd className="text-textMuted">{contact.clinic.area}</dd>
                </div>
                <div>
                  <dt className="text-textMuted">Hours</dt>
                  <dd className="mt-1 font-medium text-textPrimary">{contact.hours.days}</dd>
                  <dd className="text-textMuted">{contact.hours.time}</dd>
                </div>
              </dl>
            </div>

            <Card
              as="aside"
              tone="base"
              padding="lg"
              className="md:col-span-5"
              aria-labelledby="what-to-say"
            >
              <Eyebrow>What to say</Eyebrow>
              <h2 id="what-to-say" className="t-h3 mt-2 font-medium">
                A short script you can use verbatim.
              </h2>

              <figure className="mt-4 rounded-md border-l-4 border-primary bg-surface px-4 py-3">
                <blockquote className="t-body text-textPrimary">
                  &ldquo;Hello &mdash; I&rsquo;d like to book a consultation with{' '}
                  <span className="font-medium">Dr. Ghulam Siddiq</span>, Chief of Surgery.
                  When is his next available slot?&rdquo;
                </blockquote>
              </figure>

              <p className="t-caption mt-4 text-textMuted">
                Useful information to have ready: your full name, age, a brief
                description of your concern or the procedure you&rsquo;re considering,
                and any imaging or reports you already have.
              </p>

              <hr className="hr-soft my-5" />

              <p className="t-caption text-textMuted">
                If you reach voicemail or the line is busy, WhatsApp the same
                number &mdash; messages are answered during working hours.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      <Section tone="base" size="md">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <article>
            <h3 className="t-h3 font-medium">Before your visit</h3>
            <p className="t-body mt-3 text-textSecondary">
              First consultations run 30&ndash;45 minutes and are deliberately
              unhurried. Please bring any prior imaging (ultrasound, CT, MRI),
              recent blood reports, a current list of medications, and any
              specialist letters you&rsquo;ve received &mdash; the more context,
              the better the conversation.
            </p>
          </article>
          <article>
            <h3 className="t-h3 font-medium">Who Dr. Siddiq sees</h3>
            <p className="t-body mt-3 text-textSecondary">
              General laparoscopic, bariatric, colorectal and upper-GI
              cases in adults of all ages &mdash; including revision bariatric
              surgery, complex reoperative work, and second opinions on
              procedures that have already been recommended elsewhere.
            </p>
          </article>
          <article>
            <h3 className="t-h3 font-medium">Finding the clinic</h3>
            <p className="t-body mt-3 text-textSecondary">
              Shifa International Hospital is located in H-8/4, Islamabad, with
              on-site parking and a dedicated OPD entrance. When you arrive,
              simply ask reception to direct you to the surgical OPD.
            </p>
          </article>
        </div>
      </Section>
    </>
  );
}

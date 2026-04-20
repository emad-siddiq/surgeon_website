import { FormEvent, useState } from 'react';
import { Seo } from '@/components/seo/Seo';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Field';
import { Card } from '@/components/ui/Card';
import { contact } from '@/content/contact';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

interface FormState {
  name: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
  consent: boolean;
  website: string;
}

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  reason: 'Bariatric consultation',
  message: '',
  consent: true,
  website: '',
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(form: FormState): Errors {
  const errs: Errors = {};
  if (!form.name.trim()) errs.name = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errs.email = 'Please enter a valid email address.';
  if (form.phone && !/^[+\d\s-]{7,}$/.test(form.phone))
    errs.phone = 'Please enter a valid phone number.';
  if (!form.consent) errs.consent = 'You must consent to proceed.';
  return errs;
}

export function Consultation() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const update =
    <K extends keyof FormState>(key: K) =>
    (value: FormState[K]) =>
      setForm((f) => ({ ...f, [key]: value }));

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (form.website) return;
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      setStatus('submitting');
      const resp = await fetch(`${API_BASE}/api/consultation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          reason: form.reason,
          message: form.message,
        }),
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      setStatus('success');
      setForm(initialState);
    } catch (_err) {
      setStatus('error');
    }
  }

  return (
    <>
      <Seo
        title="Consultation"
        description={`Request a consultation with Dr. Ghulam Siddiq at ${contact.clinic.name}. First appointments are unhurried — we review your history before discussing anything operative.`}
        path="/consultation"
      />

      <section className="bg-gradient-hero">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <Eyebrow>Consultation</Eyebrow>
              <h1 className="t-display mt-3 max-w-[18ch] sm:mt-4">
                Looking for a consultation?
              </h1>
              <p className="t-body-lg mt-4 max-w-[44ch] text-textSecondary sm:mt-6">
                Tell us a little about your case and we’ll come back with an appointment slot.
                First consultations are unhurried — we talk through your history, goals and the
                honest trade-offs before we discuss anything operative.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-6 text-sm text-textSecondary">
                <div>
                  <dt className="text-textMuted">Where</dt>
                  <dd className="mt-1 font-medium text-textPrimary">{contact.clinic.name}</dd>
                  <dd className="text-textMuted">{contact.clinic.area}</dd>
                </div>
                <div>
                  <dt className="text-textMuted">When</dt>
                  <dd className="mt-1 font-medium text-textPrimary">{contact.hours.days}</dd>
                  <dd className="text-textMuted">{contact.hours.time}</dd>
                </div>
                <div>
                  <dt className="text-textMuted">Phone</dt>
                  <dd className="mt-1 font-medium text-textPrimary">
                    <a className="hover:text-primary" href={`tel:${contact.phone.tel}`}>
                      {contact.phone.display}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-textMuted">Email</dt>
                  <dd className="mt-1 font-medium text-textPrimary">
                    <a className="hover:text-primary" href={`mailto:${contact.email}`}>
                      {contact.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
            <Card
              as="section"
              padding="lg"
              className="md:col-span-7"
              aria-label="Request consultation form"
            >
              {status === 'success' ? (
                <div role="status" aria-live="polite">
                  <Eyebrow>Thank you</Eyebrow>
                  <p className="t-h3 mt-3 font-medium">
                    We’ll be in touch within one working day.
                  </p>
                  <p className="t-body mt-3 text-textSecondary">
                    A note confirming next steps and what to prepare for your first visit is on
                    its way to the email you provided.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <label className="sr-only" aria-hidden="true" htmlFor="website">
                    Website
                  </label>
                  <input
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => update('website')(e.target.value)}
                    className="hidden"
                  />

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <Input
                      label="Full name"
                      placeholder="e.g. Ayesha Khan"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => update('name')(e.target.value)}
                      error={errors.name}
                    />
                    <Input
                      label="Phone"
                      placeholder="+92 300 0000 000"
                      inputMode="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => update('phone')(e.target.value)}
                      error={errors.phone}
                    />
                    <div className="md:col-span-2">
                      <Input
                        label="Email"
                        placeholder="you@domain.com"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => update('email')(e.target.value)}
                        error={errors.email}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Select
                        label="Reason for consultation"
                        value={form.reason}
                        onChange={(e) => update('reason')(e.target.value)}
                        options={[
                          { label: 'Bariatric consultation', value: 'Bariatric consultation' },
                          { label: 'General laparoscopic', value: 'General laparoscopic' },
                          { label: 'Colorectal procedure', value: 'Colorectal procedure' },
                          { label: 'Second opinion', value: 'Second opinion' },
                        ]}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Textarea
                        label="Anything we should know in advance?"
                        placeholder="History, medications, questions you’d like addressed."
                        rows={4}
                        value={form.message}
                        onChange={(e) => update('message')(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <label className="flex max-w-[48ch] items-start gap-3 text-sm text-textSecondary">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => update('consent')(e.target.checked)}
                        className="mt-1 h-5 w-5 shrink-0 accent-primary"
                      />
                      I understand my information will be used only to schedule and prepare for
                      this consultation.
                    </label>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={status === 'submitting'}
                      className="w-full sm:w-auto"
                    >
                      {status === 'submitting' ? 'Sending…' : 'Book an Appointment'}
                    </Button>
                  </div>
                  {errors.consent ? (
                    <p className="mt-3 text-sm text-red-600" role="alert">
                      {errors.consent}
                    </p>
                  ) : null}
                  {status === 'error' ? (
                    <p className="mt-3 text-sm text-red-600" role="alert">
                      Something went wrong submitting your request. Please try again, or call{' '}
                      {contact.phone.display}.
                    </p>
                  ) : null}
                </form>
              )}
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}

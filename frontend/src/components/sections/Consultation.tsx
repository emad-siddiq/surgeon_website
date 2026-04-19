import { FormEvent, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Field';
import { Card } from '@/components/ui/Card';
import { Aurora } from '@/components/aurora/Aurora';
import { contact } from '@/content/contact';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

interface FormState {
  name: string;
  email: string;
  phone: string;
  day: string;
  reason: string;
  message: string;
  consent: boolean;
  /** Honeypot — must stay empty. */
  website: string;
}

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  day: 'Tuesday',
  reason: 'Bariatric consult',
  message: '',
  consent: true,
  website: '',
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(form: FormState): Errors {
  const errs: Errors = {};
  if (!form.name.trim()) errs.name = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Please enter a valid email address.';
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
    if (form.website) return; // honeypot tripped; silently drop
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
          day: form.day,
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
    <section id="consultation" aria-labelledby="consultation-heading">
      <Container className="py-14 md:py-20">
        <div className="relative overflow-hidden rounded-xl border border-[rgba(178,85,58,0.12)] bg-peach50 p-8 md:p-14">
          <Aurora muted />
          <div className="relative z-[2] grid grid-cols-1 items-start gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <Eyebrow rule>Consultation</Eyebrow>
              <h2
                id="consultation-heading"
                className="font-display t-h1 mt-4 max-w-[18ch]"
              >
                Start with a conversation, not a procedure.
              </h2>
              <p className="t-body-lg mt-5 max-w-[40ch] text-ink2">
                First consultations are 45 minutes. We talk through your history, goals, and the
                honest trade-offs before we discuss anything operative.
              </p>
              <dl className="t-caption mt-8 grid grid-cols-2 gap-6 text-ink2">
                <div>
                  <dt className="text-ink3">When</dt>
                  <dd className="mt-1 font-medium text-ink">
                    {contact.hours.days} — mornings
                  </dd>
                </div>
                <div>
                  <dt className="text-ink3">Where</dt>
                  <dd className="mt-1 font-medium text-ink">{contact.clinic.name}</dd>
                </div>
                <div>
                  <dt className="text-ink3">Fee</dt>
                  <dd className="mt-1 font-medium text-ink">{contact.consultation.fee}</dd>
                </div>
                <div>
                  <dt className="text-ink3">Insurance</dt>
                  <dd className="mt-1 font-medium text-ink">{contact.consultation.insurance}</dd>
                </div>
              </dl>
            </div>
            <Card as="section" padding="lg" className="md:col-span-7" aria-label="Request consultation form">
              {status === 'success' ? (
                <div role="status" aria-live="polite">
                  <Eyebrow>Thank you</Eyebrow>
                  <p className="font-display mt-3 t-h3">We’ll be in touch within one working day.</p>
                  <p className="t-body mt-3 text-ink2">
                    A note on next steps, and what to prepare for your first visit, is on its way
                    to the email you provided.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  {/* honeypot, visually hidden */}
                  <label
                    className="sr-only"
                    aria-hidden="true"
                    htmlFor="website"
                  >
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
                    <Select
                      label="Preferred day"
                      value={form.day}
                      onChange={(e) => update('day')(e.target.value)}
                      options={[
                        { label: 'Tuesday', value: 'Tuesday' },
                        { label: 'Wednesday', value: 'Wednesday' },
                        { label: 'Friday', value: 'Friday' },
                      ]}
                    />
                    <Select
                      label="Reason for visit"
                      value={form.reason}
                      onChange={(e) => update('reason')(e.target.value)}
                      options={[
                        { label: 'Bariatric consult', value: 'Bariatric consult' },
                        { label: 'General laparoscopic', value: 'General laparoscopic' },
                        { label: 'Second opinion', value: 'Second opinion' },
                      ]}
                    />
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
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <label className="flex max-w-[48ch] items-start gap-3 text-ink2 t-caption">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => update('consent')(e.target.checked)}
                        className="mt-1 accent-clay"
                      />
                      I understand my information will be used only to schedule and prepare for
                      this consultation.
                    </label>
                    <Button type="submit" variant="primary" disabled={status === 'submitting'}>
                      {status === 'submitting' ? 'Sending…' : 'Request consultation'}
                    </Button>
                  </div>
                  {errors.consent ? (
                    <p className="t-caption mt-3 text-clayDark" role="alert">
                      {errors.consent}
                    </p>
                  ) : null}
                  {status === 'error' ? (
                    <p className="t-caption mt-3 text-clayDark" role="alert">
                      Something went wrong submitting your request. Please try again, or call{' '}
                      {contact.phone.display}.
                    </p>
                  ) : null}
                </form>
              )}
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}

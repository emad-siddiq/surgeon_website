import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { IconButton } from '@/components/ui/IconButton';
import { Input, Select, Textarea } from '@/components/ui/Field';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { color } from '@/design-system/tokens';

/**
 * Dev-only visual diff of every token and primitive against
 * `docs/design/style-guide.html`. Not included in production sitemap.
 */
export function StyleGuide() {
  return (
    <Container className="py-16">
      <p className="t-eyebrow text-ink3">Design system · v1.0</p>
      <h1 className="font-display-tight t-display mt-6 max-w-[18ch]">
        A quiet, warm system for a careful practice.
      </h1>

      <Section tone="cream" size="sm">
        <Eyebrow>01 · Color</Eyebrow>
        <ul role="list" className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {Object.entries(color).map(([name, value]) => (
            <li key={name}>
              <Card padding="sm">
                <div
                  aria-hidden="true"
                  className="aspect-square rounded-md border border-border1"
                  style={{ background: value }}
                />
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-display text-sm font-medium">{name}</span>
                  <span className="font-mono text-xs text-ink3">{value}</span>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="cream" size="sm">
        <Eyebrow>02 · Typography</Eyebrow>
        <div className="mt-6 space-y-8">
          <div>
            <p className="t-eyebrow">display · Fraunces tight</p>
            <p className="font-display-tight t-display mt-3">A careful hand, a quiet room.</p>
          </div>
          <div>
            <p className="t-eyebrow">h1</p>
            <p className="font-display t-h1 mt-3">Minimally invasive surgery.</p>
          </div>
          <div>
            <p className="t-eyebrow">h2</p>
            <p className="font-display t-h2 mt-3">Procedures explained without jargon.</p>
          </div>
          <div>
            <p className="t-eyebrow">h3</p>
            <p className="font-display-soft t-h3 mt-3">Laparoscopic sleeve gastrectomy</p>
          </div>
          <div>
            <p className="t-eyebrow">body-lg</p>
            <p className="t-body-lg mt-3 text-ink2">
              Most patients who visit us have been researching for months. Our first appointment is unhurried.
            </p>
          </div>
          <div>
            <p className="t-eyebrow">body</p>
            <p className="t-body mt-3 text-ink">
              Dr. Siddiq is a board-certified laparoscopic and bariatric surgeon.
            </p>
          </div>
          <div>
            <p className="t-eyebrow">caption</p>
            <p className="t-caption mt-3 text-ink3">
              Post-operative check-ins are scheduled at one week, six weeks, and twelve months.
            </p>
          </div>
          <div>
            <p className="t-eyebrow">eyebrow</p>
            <p className="t-eyebrow mt-3 text-ink2">Consultation · By appointment</p>
          </div>
        </div>
      </Section>

      <Section tone="cream" size="sm">
        <Eyebrow>03 · Buttons</Eyebrow>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button>Book consultation</Button>
          <Button variant="secondary">Read the bio</Button>
          <Button variant="ghost">See all procedures →</Button>
          <Button disabled>Unavailable</Button>
          <ButtonLink href="#" variant="primary">
            Anchor CTA
          </ButtonLink>
        </div>
      </Section>

      <Section tone="cream" size="sm">
        <Eyebrow>04 · Tags &amp; icons</Eyebrow>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Tag>Procedure</Tag>
          <Tag tone="sage">Same-day</Tag>
          <Tag tone="lilac">Credential</Tag>
          <IconButton aria-label="Previous">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </IconButton>
          <IconButton aria-label="Next">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </IconButton>
          <IconButton aria-label="Play" variant="solid">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </IconButton>
        </div>
      </Section>

      <Section tone="cream" size="sm">
        <Eyebrow>05 · Inputs</Eyebrow>
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input label="Full name" placeholder="e.g. Ayesha Khan" />
          <Input label="Email" placeholder="you@domain.com" defaultValue="ayesha@incomplete" error="Please enter a full email." />
          <Select
            label="Reason for consultation"
            options={[
              { label: 'Gastric sleeve', value: 'sleeve' },
              { label: 'Gastric bypass', value: 'bypass' },
              { label: 'General laparoscopic', value: 'general' },
            ]}
          />
          <Textarea label="Message" placeholder="Anything you'd like us to know..." />
        </div>
      </Section>
    </Container>
  );
}

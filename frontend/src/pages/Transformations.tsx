import { Seo } from '@/components/seo/Seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonRouterLink } from '@/components/ui/Button';
import { BeforeAfter } from '@/components/ui/BeforeAfter';
import { beforeAfterStories } from '@/content/media';

export function Transformations() {
  return (
    <>
      <Seo
        title="Transformations"
        description="Real patient outcomes after bariatric surgery with Dr. Ghulam Siddiq. Drag the slider to compare before and after — every photograph is shared with written consent."
        path="/transformations"
      />

      <PageHeader
        eyebrow="Patient outcomes"
        title={<>Twelve months, in their own bodies.</>}
        lead="Drag the handle to compare. Every photograph on this page is shared with written consent from the patient. Individual results vary — these are representative cases, not guarantees."
      />

      <Section tone="base" size="lg">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {beforeAfterStories.map((story, i) => (
            <BeforeAfter
              key={i}
              before={story.before}
              after={story.after}
              beforeCaption={story.beforeCaption}
              afterCaption={story.afterCaption}
            />
          ))}
        </div>
      </Section>

      <section className="bg-gradient-hero">
        <div className="mx-auto w-full max-w-container px-6 py-14 md:px-10 md:py-20">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr,auto]">
            <div>
              <Eyebrow>Could this be you?</Eyebrow>
              <h2 className="t-h1 mt-3 max-w-[22ch]">
                Book a consultation and find out.
              </h2>
            </div>
            <ButtonRouterLink to="/consultation" variant="primary">
              Book an Appointment
            </ButtonRouterLink>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * `/transformations` route. PageHeader → grid of <BeforeAfter> drag
 * sliders (one per story in `beforeAfterStories`) → CtaBand close.
 *
 * Each story is a paired before/after photograph shared with the
 * patient's written consent (see content/media.ts). The lead copy on
 * PageHeader notes that individual results vary — required language.
 */
import { Seo } from '@/components/seo/Seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { CtaBand } from '@/components/ui/CtaBand';
import { BeforeAfter } from '@/components/ui/BeforeAfter';
import { beforeAfterStories } from '@/content/media';

export function Transformations() {
  return (
    <>
      <Seo
        title="Transformations"
        description="Before and after photographs from bariatric patients of Dr. Ghulam Siddiq, each shared with the patient's written consent. Drag the slider to compare."
        path="/transformations"
      />

      <PageHeader
        eyebrow="Patient outcomes"
        title={<>Before and after surgery.</>}
        lead="Drag the handle to compare before and after. Every photograph on this page has been shared with written consent from the patient. Individual results always vary; these are real cases, not a guarantee of any particular outcome."
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

      <CtaBand
        eyebrow="Could this be you?"
        headline="Book a consultation and find out."
        to="/consultation"
        cta="Book an Appointment"
      />
    </>
  );
}

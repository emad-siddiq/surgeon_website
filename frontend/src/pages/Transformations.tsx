import { Seo } from '@/components/seo/Seo';
import { Container } from '@/components/ui/Container';
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
        lead="Drag the handle to compare before and after. Every photograph on this page has been shared with written consent from the patient. Individual results always vary — these are representative, real-world cases, not a guarantee of any particular outcome."
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
        <Container className="py-12 sm:py-14 md:py-20">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr,auto]">
            <div>
              <Eyebrow>Could this be you?</Eyebrow>
              <h2 className="t-h1 mt-3 max-w-[22ch]">
                Book a consultation and find out.
              </h2>
            </div>
            <ButtonRouterLink
              to="/consultation"
              variant="primary"
              className="w-full md:w-auto"
            >
              Book an Appointment
            </ButtonRouterLink>
          </div>
        </Container>
      </section>
    </>
  );
}

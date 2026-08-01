/**
 * `/gallery` route. PageHeader → static photo grid (1/2/3 columns
 * across breakpoints) of wide 3:2 tiles matching the landscape
 * source photos.
 *
 * Images come from `galleryImages` in content/media.ts. The first four
 * are eager-loaded; the rest are lazy.
 */
import { Seo } from '@/components/seo/Seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { galleryImages } from '@/content/media';

export function Gallery() {
  return (
    <>
      <Seo
        title="Gallery"
        description="A few quiet frames from Shifa International Hospital and Dr. Siddiq's practice."
        path="/gallery"
      />

      <PageHeader
        eyebrow="Gallery"
        title={<>A few quiet frames from the clinic.</>}
        lead="A small collection of photographs from Shifa International Hospital and Dr. Siddiq's practice: the spaces, the team and the everyday work behind the surgery, shared with the hospital's permission."
      />

      <Section tone="base" size="lg">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {galleryImages.map((image, i) => (
            <li key={image.src}>
              <img
                src={image.src}
                alt={image.alt}
                width={1200}
                height={800}
                loading={i < 4 ? 'eager' : 'lazy'}
                decoding="async"
                className="aspect-[3/2] h-full w-full rounded-lg border border-border1 object-cover shadow-card transition-transform duration-300 ease-breathe hover:-translate-y-1"
              />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

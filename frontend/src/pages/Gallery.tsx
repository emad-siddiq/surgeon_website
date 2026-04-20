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
        lead="Photographs from Shifa International Hospital and Dr. Siddiq's practice, shared with the hospital's permission."
      />

      <Section tone="base" size="lg">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {galleryImages.map((image, i) => (
            <li
              key={image.src}
              className={
                // Give a few images extra presence — taller and spanning two columns at the large breakpoint.
                i === 0 || i === 7
                  ? 'sm:row-span-2 sm:[&>img]:aspect-[3/4]'
                  : i === 3
                    ? 'lg:col-span-2 lg:[&>img]:aspect-[16/9]'
                    : ''
              }
            >
              <img
                src={image.src}
                alt={image.alt}
                width={800}
                height={800}
                loading={i < 4 ? 'eager' : 'lazy'}
                decoding="async"
                className="aspect-square h-full w-full rounded-lg border border-border1 object-cover shadow-card transition-transform duration-300 ease-breathe hover:-translate-y-1"
              />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

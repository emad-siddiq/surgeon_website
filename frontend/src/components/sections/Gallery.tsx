import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { galleryImages } from '@/content/gallery';
import { cn } from '@/lib/cn';

const matClass: Record<'peach' | 'lilac', string> = {
  peach: 'bg-peach50 p-3',
  lilac: 'bg-lilac50 p-3',
};

export function Gallery() {
  return (
    <Section id="gallery" tone="cream" size="md" aria-labelledby="gallery-heading">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow rule>Gallery</Eyebrow>
          <h2 id="gallery-heading" className="font-display t-h1 mt-4 max-w-[22ch]">
            A few quiet frames from the clinic.
          </h2>
        </div>
      </div>
      <ul
        role="list"
        className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3"
      >
        {galleryImages.map((image, i) => (
          <li
            key={image.src}
            className={cn(
              'overflow-hidden rounded-lg',
              matClass[image.tone],
              i === 0 && 'md:row-span-2',
            )}
          >
            <img
              src={image.src}
              alt={image.alt}
              width={800}
              height={800}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full rounded-md object-cover"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}

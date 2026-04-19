/**
 * Gallery images live in `src/assets/images/gallery/`.
 * TODO(content): supply a real alt-text for every image below.
 */
import img1 from '@/assets/images/gallery/1.jpg';
import img2 from '@/assets/images/gallery/2.jpg';
import img3 from '@/assets/images/gallery/3.jpg';
import img4 from '@/assets/images/gallery/4.jpg';
import img5 from '@/assets/images/gallery/5.jpg';
import img6 from '@/assets/images/gallery/6.jpg';

export interface GalleryImage {
  src: string;
  alt: string;
  tone: 'peach' | 'lilac';
}

export const galleryImages: GalleryImage[] = [
  { src: img1, alt: 'Clinic interior, natural light', tone: 'peach' },
  { src: img2, alt: 'Surgical team, mid-procedure', tone: 'lilac' },
  { src: img3, alt: 'Consultation room', tone: 'peach' },
  { src: img4, alt: 'Laparoscopic instruments', tone: 'lilac' },
  { src: img5, alt: 'Recovery area', tone: 'peach' },
  { src: img6, alt: 'Patient follow-up', tone: 'lilac' },
];

/* Transformations (before/after) */
import before1 from '@/assets/images/before_after/before_1.jpg';
import after1 from '@/assets/images/before_after/after_1.jpg';
import before2 from '@/assets/images/before_after/before_2.jpg';
import after2 from '@/assets/images/before_after/after_2.jpg';

export interface TransformationStory {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  caption: string;
}

export const transformations: TransformationStory[] = [
  {
    before: { src: before1, alt: 'Patient before surgery' },
    after: { src: after1, alt: 'Patient twelve months after surgery' },
    caption: 'Twelve months after sleeve gastrectomy. Shared with written consent.',
  },
  {
    before: { src: before2, alt: 'Patient before surgery' },
    after: { src: after2, alt: 'Patient nine months after surgery' },
    caption: 'Nine months after bypass. Shared with written consent.',
  },
];

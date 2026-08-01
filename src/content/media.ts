/** All image / video assets used on the site, grouped for re-use. */
import hero1 from '@/assets/images/main-slider/1.jpeg';
import hero2 from '@/assets/images/main-slider/2.jpeg';
import hero3 from '@/assets/images/main-slider/3.jpeg';
import experiencePortrait from '@/assets/images/experience.jpg';
import about1 from '@/assets/images/about1.jpg';

import b1 from '@/assets/images/before_after/before_1.jpg';
import a1 from '@/assets/images/before_after/after_1.jpg';
// NOTE: before_2.jpg / after_2.jpg are withheld. Those source files ship
// with a circular photo mask and baked-in "Before" / "After" watermark
// text, which breaks the drag-to-compare pattern mid-drag. Reinstate the
// second story when the practice supplies a clean rectangular pair. See
// .claude/docs/history.md § "Decisions needed".
import b3 from '@/assets/images/before_after/before_3.png';
import a3 from '@/assets/images/before_after/after_3.png';

import g1 from '@/assets/images/gallery/1.jpg';
import g2 from '@/assets/images/gallery/2.jpg';
import g3 from '@/assets/images/gallery/3.jpg';
import g4 from '@/assets/images/gallery/4.jpg';
import g5 from '@/assets/images/gallery/5.jpg';
import g6 from '@/assets/images/gallery/6.jpg';
import g7 from '@/assets/images/gallery/7.jpg';
import g8 from '@/assets/images/gallery/8.jpg';
import g9 from '@/assets/images/gallery/9.jpg';
import g10 from '@/assets/images/gallery/10.jpeg';
import g11 from '@/assets/images/gallery/11.jpeg';
import g12 from '@/assets/images/gallery/12.jpeg';
import g13 from '@/assets/images/gallery/13.jpeg';
import g14 from '@/assets/images/gallery/14.jpeg';
import g15 from '@/assets/images/gallery/15.jpeg';

import shifaLoop from '@/assets/videos/shifa.mp4';
import shifaIntro from '@/assets/videos/shifa-video.mp4';

export const heroImages = [
  { src: hero1, alt: 'Dr. Ghulam Siddiq in the operating theatre' },
  { src: hero2, alt: 'Surgical team at Shifa International Hospital' },
  { src: hero3, alt: 'Laparoscopic surgery underway' },
];

export const aboutPortrait = {
  src: experiencePortrait,
  alt: 'Portrait of Dr. Ghulam Siddiq',
};

export const bariatricPortrait = {
  src: about1,
  alt: 'Dr. Ghulam Siddiq in his bariatric surgery practice',
};

/**
 * Before/after pairs as shipped on the original site.
 *
 * Captions are deliberately neutral. The original site carried specific
 * weight figures, but the practice has not yet confirmed them against
 * patient records, and unverified numbers do not belong on the page.
 * TODO(content): restore per-story figures and timeframes once the
 * practice supplies patient-consented data.
 */
export interface BeforeAfter {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  beforeCaption: string;
  afterCaption: string;
}

export const beforeAfterStories: BeforeAfter[] = [
  {
    before: { src: b1, alt: 'Patient before bariatric surgery' },
    after: { src: a1, alt: 'Patient after bariatric surgery' },
    beforeCaption: 'Before surgery',
    afterCaption: 'After surgery',
  },
  {
    before: { src: b3, alt: 'Patient before bariatric surgery' },
    after: { src: a3, alt: 'Patient after bariatric surgery' },
    beforeCaption: 'Before surgery',
    afterCaption: 'After surgery',
  },
];

/**
 * Gallery: fifteen images as shipped on the original site. Alt text is
 * placeholder pending real descriptions from the practice.
 */
export interface GalleryImage {
  src: string;
  alt: string;
}

// TODO(content): provide per-image alt text.
export const galleryImages: GalleryImage[] = [
  { src: g1, alt: 'Main reception at the clinic' },
  { src: g2, alt: 'Operating theatre' },
  { src: g3, alt: 'Surgical team prepping for a case' },
  { src: g4, alt: 'Consultation room' },
  { src: g5, alt: 'Dr. Siddiq with patient' },
  { src: g6, alt: 'Post-op recovery area' },
  { src: g7, alt: 'Laparoscopic instrument set' },
  { src: g8, alt: 'Hospital exterior' },
  { src: g9, alt: 'Clinical floor' },
  { src: g10, alt: 'Surgical team at work' },
  { src: g11, alt: 'Hospital corridor' },
  { src: g12, alt: 'OR monitoring equipment' },
  { src: g13, alt: 'Patient follow-up consultation' },
  { src: g14, alt: 'Clinic waiting area' },
  { src: g15, alt: 'Shifa International Hospital lobby' },
];

export const videos = {
  /** Used on the Location page: silent ambient loop of the hospital. */
  clinicLoop: shifaLoop,
  /** Used on About + Consultation pages: introduction video with audio. */
  intro: shifaIntro,
} as const;

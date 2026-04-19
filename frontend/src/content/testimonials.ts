/**
 * TODO(content): replace placeholder testimonials with real consented quotes
 * before launch. Names initialized to a first name + initial only.
 */
export interface Testimonial {
  quote: string;
  name: string;
  caption: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'I came in expecting a sales pitch and left with a quiet plan. A year on, I walk my daughter to school every morning. The plan held.',
    name: 'Saima R.',
    caption: 'Sleeve gastrectomy · Apr 2025',
  },
  {
    quote:
      'The entire process was slower and more careful than I expected, in the best possible way. Everything was explained. I knew what to expect at every step.',
    name: 'John D.',
    caption: 'General laparoscopic · Jan 2025',
  },
];

import award from '@/assets/images/distinctions/1.jpeg';
import oxford from '@/assets/images/distinctions/oxford1.png';

/** Distinctions — sourced from Distinctions.jsx at commit 0fb3280. */
export interface Distinction {
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  stat?: { value: string; label: string };
}

export const distinctionsHeading = 'A shining legacy in endoscopic surgery';

export const distinctions: Distinction[] = [
  {
    title: 'Presidential Award for Surgical Excellence',
    body: 'Dr. Ghulam Siddiq has been honoured with the highly prestigious Presidential Award for Surgical Excellence — a testament to his exceptional skills, dedication and groundbreaking contributions to the field of medical science. His commitment to patient care and his ability to perform complex procedures with precision have earned him respect and admiration from colleagues and patients alike. The Presidential Award is a reflection of his tireless work ethic, dedication to excellence, and relentless pursuit of perfection in the operating room.',
    image: award,
    imageAlt: 'Dr. Ghulam Siddiq receiving the Presidential Award for Surgical Excellence',
  },
  {
    title: 'Internationally renowned in Endoscopic Surgery',
    body: 'With an impressive record of 970 bariatric surgery procedures, Dr. Siddiq stands as a pioneering figure in metabolic and weight-loss surgical interventions. His extensive experience demonstrates not just technical proficiency, but a commitment to transforming patient lives through advanced surgical solutions.',
    image: oxford,
    imageAlt: 'Dr. Ghulam Siddiq — international endoscopic surgery recognition',
    stat: { value: '970', label: 'Bariatric procedures' },
  },
];

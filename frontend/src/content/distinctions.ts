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
    body: 'Dr. Ghulam Siddiq has been honoured with the highly prestigious Presidential Award for Surgical Excellence — a recognition of his exceptional technical skill, his dedication to patients, and his groundbreaking contributions to surgical science in Pakistan. His steady commitment to patient care and his ability to perform complex procedures with precision have earned him the respect and admiration of colleagues and patients alike. The Presidential Award reflects decades of tireless work, an unwavering standard of excellence, and a relentless pursuit of better outcomes in the operating room.',
    image: award,
    imageAlt: 'Dr. Ghulam Siddiq receiving the Presidential Award for Surgical Excellence',
  },
  {
    title: 'Internationally renowned in Endoscopic Surgery',
    body: 'With an impressive record of 970 bariatric surgery procedures, Dr. Siddiq stands as a pioneering figure in metabolic and weight-loss surgery — recognised across Pakistan and in international endoscopic surgery circles. His extensive experience reflects not only technical proficiency, but a long-term commitment to transforming patients’ lives through modern, minimally invasive surgical solutions.',
    image: oxford,
    imageAlt: 'Dr. Ghulam Siddiq — international endoscopic surgery recognition',
    stat: { value: '970', label: 'Bariatric procedures' },
  },
];

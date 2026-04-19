/**
 * Distinctions — sourced verbatim from Distinctions.jsx at commit 0fb3280.
 */
export interface Distinction {
  title: string;
  body: string;
  stat?: { value: string; label: string };
}

export const distinctionsHeading = 'A shining legacy in endoscopic surgery';

export const distinctions: Distinction[] = [
  {
    title: 'Presidential Award for Surgical Excellence',
    body: 'Dr. Ghulam Siddiq has been honoured with the highly prestigious Presidential Award for Surgical Excellence — a testament to his exceptional skill, dedication and groundbreaking contributions to surgical practice in Pakistan. The award reflects his commitment to patient care and his ability to perform complex procedures with precision.',
  },
  {
    title: 'Internationally renowned in Endoscopic Surgery',
    body: 'With an impressive record of 970 bariatric surgery procedures, Dr. Siddiq stands as a pioneering figure in metabolic and weight-loss surgical interventions. His extensive experience demonstrates not just technical proficiency but a commitment to transforming patient lives through advanced surgical solutions.',
    stat: { value: '970', label: 'Bariatric procedures' },
  },
];

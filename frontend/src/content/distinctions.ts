import award from '@/assets/images/distinctions/1.jpeg';
import oxford from '@/assets/images/distinctions/oxford1.png';
// TODO(content): replace with a POMSS conference / workshop photograph once
// the practice supplies one. Reusing a gallery asset as a placeholder.
import pomssPlaceholder from '@/assets/images/gallery/10.jpeg';

/** Distinctions. Facts sourced from the original site at commit 0fb3280. */
export interface Distinction {
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  stat?: { value: string; label: string };
}

export const distinctionsHeading = 'The record behind the practice';

export const distinctions: Distinction[] = [
  {
    title: 'Presidential Award for Surgical Excellence',
    body: 'Dr. Ghulam Siddiq received the Presidential Award for Surgical Excellence, a national honour recognising his contribution to surgery in Pakistan. The award sits on top of decades of ordinary weeks: full operating lists, complex cases, and patients seen through from first consultation to final follow-up.',
    image: award,
    imageAlt: 'Dr. Ghulam Siddiq receiving the Presidential Award for Surgical Excellence',
  },
  {
    title: 'Depth of experience in bariatric surgery',
    body: 'Dr. Siddiq has performed 970 bariatric procedures across his career in metabolic and weight-loss surgery. Depth of this kind matters: bariatric surgery is a field where outcomes track surgeon experience, and where the judgment to match each patient with the right operation is built case by case.',
    image: oxford,
    imageAlt: 'Recognition of Dr. Ghulam Siddiq’s work in endoscopic surgery',
    stat: { value: '970', label: 'Bariatric procedures' },
  },
  {
    title: 'President, Pakistan Obesity & Metabolic Surgery Society',
    body: 'Dr. Siddiq serves as President of the Pakistan Obesity and Metabolic Surgery Society (POMSS). In that role he leads hands-on training workshops in hospitals across the country, from Upper Dir, Swat and Peshawar in the north to Faisalabad, Lahore and Multan, raising the standard of bariatric and metabolic surgery nationally. He also chaired the society’s international conference, which brought surgeons and specialist societies from China, Lebanon, the UAE and beyond together for clinical exchange and live surgical demonstration.',
    image: pomssPlaceholder,
    imageAlt: 'Dr. Ghulam Siddiq leading a POMSS workshop',
  },
];

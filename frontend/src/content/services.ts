export interface ServiceEntry {
  slug: string;
  tag: string;
  tagTone: 'peach' | 'sage' | 'lilac';
  title: string;
  summary: string;
  details?: string;
  imageTone: 'warm' | 'cool';
}

export const services: ServiceEntry[] = [
  {
    slug: 'gastric-sleeve',
    tag: 'Bariatric',
    tagTone: 'peach',
    title: 'Gastric sleeve',
    summary:
      'Laparoscopic sleeve gastrectomy. Around 60 minutes, same-day discharge, four to six weeks to everyday movement.',
    imageTone: 'warm',
  },
  {
    slug: 'gastric-bypass',
    tag: 'Bariatric',
    tagTone: 'lilac',
    title: 'Gastric bypass',
    summary:
      'For patients with significant comorbidities. Longer operative time, longer clinical follow-up, durable results.',
    imageTone: 'cool',
  },
  {
    slug: 'general-laparoscopic',
    tag: 'General',
    tagTone: 'sage',
    title: 'Laparoscopic surgery',
    summary:
      'Cholecystectomy, hernia repair, and other minimally invasive abdominal procedures, on demand.',
    imageTone: 'warm',
  },
];

export interface BariatricProcedure {
  number: string;
  title: string;
  body: string;
}

export const bariatricProcedures: BariatricProcedure[] = [
  {
    number: '01',
    title: 'Sleeve gastrectomy',
    body: 'We remove about 75 percent of the stomach laparoscopically, leaving a narrow sleeve. A short operation; recovery is measured in weeks rather than months.',
  },
  {
    number: '02',
    title: 'Roux-en-Y gastric bypass',
    body: 'A smaller stomach pouch is connected directly to the lower small intestine. The right choice for patients whose condition needs a more durable metabolic effect.',
  },
];

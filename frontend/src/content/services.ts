/**
 * Procedures. Copy sourced from ServiceOfferings.jsx at commit 0fb3280.
 * The `volume` field is the approximate case count shown on the old site
 * next to each procedure — adjust as the practice provides fresh numbers.
 */
export interface ServiceEntry {
  slug: string;
  title: string;
  subtitle: string;
  volume: number;
  category: 'General' | 'Bariatric' | 'Colorectal' | 'Upper GI';
}

export const services: ServiceEntry[] = [
  {
    slug: 'laparoscopic-cholecystectomy',
    title: 'Laparoscopic Cholecystectomy',
    subtitle: 'Gall bladder removal, minimally invasive',
    volume: 9000,
    category: 'General',
  },
  {
    slug: 'appendix-surgery',
    title: 'Appendix Surgery',
    subtitle: 'Laparoscopic appendicectomy',
    volume: 8000,
    category: 'General',
  },
  {
    slug: 'laparoscopic-surgery',
    title: 'Laparoscopic Surgery',
    subtitle: 'Advanced minimally invasive techniques',
    volume: 1500,
    category: 'General',
  },
  {
    slug: 'colon-surgery',
    title: 'Colon Surgery',
    subtitle: 'Complex colorectal procedures',
    volume: 65,
    category: 'Colorectal',
  },
  {
    slug: 'anterior-resection',
    title: 'Anterior Resection',
    subtitle: 'Precise rectal surgical approach',
    volume: 88,
    category: 'Colorectal',
  },
  {
    slug: 'low-anterior-resection',
    title: 'Low Anterior Resection',
    subtitle: 'Specialised colorectal technique',
    volume: 79,
    category: 'Colorectal',
  },
  {
    slug: 'right-hemicolectomy',
    title: 'Right Hemicolectomy',
    subtitle: 'Right-side colon resection',
    volume: 63,
    category: 'Colorectal',
  },
  {
    slug: 'left-hemicolectomy',
    title: 'Hemicolectomy',
    subtitle: 'Left-side colon resection',
    volume: 71,
    category: 'Colorectal',
  },
  {
    slug: 'partial-gastrectomy',
    title: 'Partial Gastrectomy',
    subtitle: 'Stomach partial removal',
    volume: 59,
    category: 'Upper GI',
  },
  {
    slug: 'esophagectomy',
    title: 'Esophagectomy',
    subtitle: 'Esophagus surgical removal',
    volume: 82,
    category: 'Upper GI',
  },
];

/**
 * Bariatric sub-procedures — the editorial two-up on Home / dedicated card
 * on BariatricCard at 0fb3280.
 */
export interface BariatricProcedure {
  number: string;
  title: string;
  body: string;
}

export const bariatricProcedures: BariatricProcedure[] = [
  {
    number: '01',
    title: 'Roux-en-Y gastric bypass',
    body: 'A smaller stomach pouch is connected directly to the lower small intestine. The operation most often chosen when durable metabolic effect is the priority.',
  },
  {
    number: '02',
    title: 'Sleeve gastrectomy',
    body: 'Laparoscopic removal of roughly 75 percent of the stomach to leave a narrow sleeve. A one-hour operation; most patients are home the same day and back to everyday movement in four to six weeks.',
  },
  {
    number: '03',
    title: 'Mini gastric bypass (OAGB)',
    body: 'A single-anastomosis gastric bypass — faster and simpler to perform than Roux-en-Y, with comparable metabolic outcomes in the right candidate.',
  },
  {
    number: '04',
    title: 'Revision bariatric surgery',
    body: 'Corrective operations for patients whose earlier bariatric procedure needs adjustment — one of Dr. Siddiq’s longest-running specialities.',
  },
];

export const bariatricIntro = {
  title: 'Bariatric Surgery',
  subtitle: 'A novel solution for obesity',
  body: [
    'Laparoscopic Bariatric surgery, a transformative weight-loss procedure, has found a pioneering champion in Dr. Ghulam Siddiq at Shifa International Hospital, Islamabad. Since 2010, he has performed over 1,400 successful laparoscopic cases, establishing himself as Pakistan’s leading authority in minimally invasive bariatric procedures.',
    'He routinely performs laparoscopic Roux-en-Y gastric bypasses, Sleeve Gastrectomies, Mini gastric bypasses (OAGB) and revision bariatric procedures.',
  ],
} as const;

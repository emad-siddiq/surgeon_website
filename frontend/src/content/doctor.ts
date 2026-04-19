/**
 * Authoritative copy for the doctor. Non-technical edits happen here.
 * All fields marked `TODO(content):` need verification against the real
 * practice before launch.
 */
export const doctor = {
  fullName: 'Dr. Ghulam Siddiq',
  short: 'Dr. Siddiq',
  credentials: 'Board-Certified Laparoscopic & Bariatric Surgeon',
  pronouns: 'he/him',

  tagline: 'A careful hand, a quiet room.',
  heroEyebrow: 'Board-certified · Laparoscopic & Bariatric',
  heroHeadline: 'Careful surgery. A long, quiet recovery.',
  heroLead:
    'Dr. Ghulam Siddiq has spent a decade helping patients through the decision, the operation, and the year that follows. Start with an unhurried conversation.',

  bioShort:
    'Dr. Ghulam Siddiq is a board-certified laparoscopic and bariatric surgeon with a decade of minimally invasive practice. He operates out of Shifa Specialty Hospital and consults by appointment on weekday mornings.',

  // TODO(content): confirm with the practice.
  bioLong: [
    'Dr. Siddiq\u2019s first appointments are unhurried. Most patients come in having researched for months; the questions behind the questions \u2014 what will recovery look like, who will help me, how will this affect the year ahead \u2014 take time to answer properly.',
    'He trained in general surgery before specializing in minimally invasive abdominal procedures, and has performed more than 1,200 laparoscopic operations to date. He believes surgery is only one stage of care, not the whole of it \u2014 post-operative follow-ups are scheduled at one week, six weeks, and twelve months, and he sees patients himself at each visit.',
  ],

  proofPoints: [
    '1,200+ laparoscopic procedures',
    'Shifa Specialty Hospital',
    'Same-day discharge, typically',
  ],

  // TODO(content): confirm exact fellowships and years with the practice.
  education: [
    { title: 'Medical Degree', detail: 'Khyber Medical College' },
    { title: 'Residency', detail: 'Lady Reading Hospital' },
    { title: 'Fellowship', detail: 'Royal College of Surgeons, Edinburgh' },
    { title: 'Certification', detail: 'PMDC — General Surgery' },
  ],
} as const;

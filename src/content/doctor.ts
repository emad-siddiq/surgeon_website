/**
 * Authoritative copy for the doctor. Case counts and positions come from
 * the practice's own records as published on the original site (commit
 * 0fb3280); edit freely as the practice provides fresh material.
 *
 * Editorial rules, enforced by the copy-integrity flow in
 * scripts/ux-flow.spec.mjs: no em dashes anywhere, and no superlative
 * claims the practice cannot back with a source.
 */
export const doctor = {
  fullName: 'Dr. Ghulam Siddiq',
  short: 'Dr. Siddiq',
  role: 'Chief of Surgery, Shifa International Hospital, Islamabad',
  credentials: 'M.B.B.S. · FRCS (Fellow, Royal College of Surgeons)',
  pronouns: 'he/him',

  heroHeadline: 'Laparoscopic and bariatric surgery, in experienced hands',
  heroLead:
    'Chief of Surgery at Shifa International Hospital: 25 years of minimally invasive surgery, with smaller incisions and a faster return to ordinary life.',

  tagline: 'Minimally invasive surgery. Thoughtful, compassionate care.',

  /** Short bio used on Home + SEO description. */
  bioShort:
    'Dr. Ghulam Siddiq is Chief of Surgery at Shifa International Hospital, Islamabad. He specialises in laparoscopic bariatric surgery, operating through small incisions so that most patients recover sooner, with less pain and smaller scars.',

  /** Long bio used on About. */
  bioLong: [
    'Dr. Ghulam Siddiq is Chief of Surgery at Shifa International Hospital in Islamabad, where he has practised for more than 25 years. His work centres on laparoscopic bariatric surgery: weight-loss operations performed through small incisions rather than a single long cut, so that patients spend less time in hospital and return to their lives sooner.',
    'He routinely performs laparoscopic Roux-en-Y gastric bypass, sleeve gastrectomy, mini gastric bypass (OAGB) and revision bariatric surgery. Since 2010 he has performed more than 1,400 laparoscopic procedures, and he serves as President of the Pakistan Obesity and Metabolic Surgery Society, training surgeons in bariatric technique across the country.',
    'Beyond the operating theatre, Dr. Siddiq is known for unhurried consultations, plain-language explanations and long-term follow-up. Each patient is guided through the decision, the operation and the months of recovery that follow.',
  ],

  proofPoints: [
    '25+ years in practice',
    '1,400+ laparoscopic cases',
    'Shifa International Hospital, Islamabad',
  ],

  education: [
    { title: 'M.B.B.S.', detail: 'Khyber Medical College' },
    { title: 'FRCS', detail: 'Fellow, Royal College of Surgeons' },
    { title: 'Chief of Surgery', detail: 'Shifa International Hospital, Islamabad' },
  ],
} as const;

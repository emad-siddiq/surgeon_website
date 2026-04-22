/**
 * Authoritative copy for the doctor. Sourced from the live site as it stood
 * at commit 0fb3280; edit freely as the practice provides fresh material.
 */
export const doctor = {
  fullName: 'Dr. Ghulam Siddiq',
  short: 'Dr. Siddiq',
  role: 'Chief of Surgery, Shifa International Hospital, Islamabad',
  credentials: 'M.B.B.S. · FRCS (Fellow, Royal College of Surgeons)',
  pronouns: 'he/him',

  heroHeadline: 'Pioneer of Laparoscopic Bariatric Surgery in Pakistan',
  heroLead:
    'A quarter-century of minimally invasive surgery at Shifa International Hospital — more than 1,400 successful laparoscopic cases, each treated with the same careful precision.',

  tagline: 'Minimally invasive surgery. Thoughtful, compassionate care.',

  /** Short bio used on Home + SEO description. */
  bioShort:
    'Dr. Ghulam Siddiq is Chief of Surgery at Shifa International Hospital, Islamabad, specialising in laparoscopic bariatric surgery — a modern, minimally invasive technique that helps patients recover faster with smaller scars and less discomfort.',

  /** Long bio used on About. */
  bioLong: [
    'Dr. Ghulam Siddiq is Chief of Surgery at Shifa International Hospital in Islamabad, Pakistan, where he has practised for over 25 years. His focus is Laparoscopic Bariatric Surgery — a state-of-the-art, minimally invasive approach that is transforming how weight-loss operations are performed in the region.',
    'He routinely performs laparoscopic Roux-en-Y gastric bypasses, Sleeve Gastrectomies, Mini gastric bypasses (OAGB) and revision bariatric procedures. Since 2010 he has completed over 1,400 successful laparoscopic cases, building a reputation as Pakistan’s leading authority in minimally invasive bariatric surgery.',
    'Beyond the operating theatre, Dr. Siddiq is known for unhurried consultations, plain-language explanations, and long-term follow-through. Each patient is guided through the decision, the surgery and the months of recovery that follow — a partnership rather than a transaction.',
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

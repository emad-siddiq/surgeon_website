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
    'Twenty-five years of minimally invasive surgery at Shifa International Hospital — over 1,400 successful laparoscopic cases and counting.',

  tagline: 'Minimally invasive surgery. Compassionate care.',

  /** Short bio used on Home + SEO description. */
  bioShort:
    'Dr. Ghulam Siddiq is Chief of Surgery at Shifa International Hospital, Islamabad, specialising in laparoscopic bariatric surgery — a state-of-the-art, minimally invasive technique.',

  /** Long bio used on About. */
  bioLong: [
    'Dr. Ghulam Siddiq is currently the Chief of Surgery at Shifa International Hospital in Islamabad, Pakistan, where he has been practicing for the last 25 years, specialising in Laparoscopic Bariatric Surgery, a state-of-the-art, minimally invasive surgical technique.',
    'He routinely performs laparoscopic Roux-en-Y gastric bypasses, Sleeve Gastrectomies, Mini gastric bypasses (OAGB) and revision bariatric procedures. Since 2010 he has performed over 1,400 successful laparoscopic cases, establishing himself as Pakistan’s leading authority in minimally invasive bariatric procedures.',
  ],

  proofPoints: [
    '25 years in practice',
    '1,400+ laparoscopic cases',
    'Shifa International Hospital, Islamabad',
  ],

  education: [
    { title: 'M.B.B.S.', detail: 'Khyber Medical College' },
    { title: 'FRCS', detail: 'Fellow, Royal College of Surgeons' },
    { title: 'Chief of Surgery', detail: 'Shifa International Hospital, Islamabad' },
  ],
} as const;

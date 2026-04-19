/**
 * Credentials / distinctions. TODO(content): verify every entry with the
 * practice before launch.
 */
export interface Distinction {
  year: string;
  title: string;
  body: string;
}

export const distinctions: Distinction[] = [
  {
    year: '2015',
    title: 'Fellowship — Royal College of Surgeons',
    body: 'Completed advanced training in laparoscopic and bariatric surgery.',
  },
  {
    year: '2018',
    title: 'Consultant Surgeon',
    body: 'Appointed consultant at Shifa Specialty Hospital\u2019s minimally invasive unit.',
  },
  {
    year: '2021',
    title: '1,000+ Laparoscopic Procedures',
    body: 'Passed one thousand minimally invasive abdominal procedures with a same-day discharge rate above 90 percent.',
  },
  {
    year: '2024',
    title: 'Bariatric Center of Excellence',
    body: 'Practice recognized for long-term follow-up and outcomes in weight-loss surgery.',
  },
];

export interface NavLink {
  label: string;
  to: string;
}

/** The desktop + mobile primary nav — every entry is a real page. */
export const primaryNav: NavLink[] = [
  { label: 'About', to: '/about' },
  { label: 'Procedures', to: '/procedures' },
  { label: 'Bariatric', to: '/bariatric' },
  { label: 'Distinctions', to: '/distinctions' },
  { label: 'Transformations', to: '/transformations' },
  { label: 'Location', to: '/location' },
];

/** Secondary links shown in the footer. */
export const secondaryNav: NavLink[] = [
  { label: 'Gallery', to: '/gallery' },
  { label: 'Consultation', to: '/consultation' },
];

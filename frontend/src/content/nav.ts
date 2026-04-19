export interface NavLink {
  label: string;
  /** React Router path or in-page anchor. */
  to: string;
}

/**
 * Single source of truth for the primary nav. Used by both the desktop
 * HoverNavBar and the MobileSidebar. The original site linked many
 * additional sub-paths (blog, FAQs, testimonials, specialities) that were
 * never actually routed; they are intentionally omitted here until real
 * content exists.
 */
export const primaryNav: NavLink[] = [
  { label: 'About', to: '/about' },
  { label: 'Procedures', to: '/#services' },
  { label: 'Bariatric', to: '/#bariatric' },
  { label: 'Distinctions', to: '/#distinctions' },
  { label: 'Location', to: '/#location' },
  { label: 'Consultation', to: '/#consultation' },
];

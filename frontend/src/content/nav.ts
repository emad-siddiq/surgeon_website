export interface NavLink {
  label: string;
  /** React Router path or in-page anchor. */
  to: string;
}

/**
 * Single source of truth for the primary nav. Used by both the desktop
 * HoverNavBar and the MobileSidebar.
 */
export const primaryNav: NavLink[] = [
  { label: 'About', to: '/about' },
  { label: 'Procedures', to: '/#services' },
  { label: 'Transformations', to: '/#transformations' },
  { label: 'Consultation', to: '/#consultation' },
  { label: 'Location', to: '/#location' },
];

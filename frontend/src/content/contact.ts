/**
 * Practice contact details. There are TWO and only two ways a patient
 * should reach the practice — WhatsApp and a phone call to the hospital
 * switchboard. Keep this file as the single source of truth for those
 * touchpoints.
 */
export const contact = {
  phone: {
    display: '+92 51 846 4646',
    tel: '+92518464646',
  },
  /**
   * Deep-link opens WhatsApp web/app with the hospital number prefilled.
   * Intentionally contains no prefilled text so the user composes their
   * own opening message.
   */
  whatsapp: {
    url: 'https://api.whatsapp.com/send/?phone=92518464646&text&type=phone_number&app_absent=0',
    display: 'WhatsApp +92 51 846 4646',
  },

  clinic: {
    name: 'Shifa International Hospital',
    area: 'Islamabad, Pakistan',
    fullAddress: 'Shifa International Hospital, H-8/4, Islamabad, Pakistan',
    /**
     * Google Maps embed URL copied verbatim from the original site
     * (frontend/src/components/web/Location/Location.jsx at 0fb3280).
     * Rotate the key on the Google Cloud console and update here before
     * launch.
     */
    mapEmbed:
      'https://www.google.com/maps/embed/v1/place?key=AIzaSyAWsBN5V049bS1UtF1_H7QONaL7kyhPMZU&q=Shifa+International+Hospital,+Islamabad',
    geo: { lat: 33.6935, lng: 73.0537 },
  },
  hours: {
    // TODO(content): confirm OPD and consultation hours with the practice.
    days: 'Mon – Sat',
    time: 'By appointment',
  },
  social: {
    facebook: 'https://facebook.com/dr.ghulamsiddiq',
    instagram: 'https://instagram.com/dr.ghulamsiddiq',
    youtube: 'https://youtube.com/@dr.ghulamsiddiq4770',
  },
} as const;

/**
 * Canonical ask patients should make when booking. The hospital
 * switchboard books for many consultants; we want Dr. Siddiq to be
 * named explicitly, without being pushy about it. Copy is reused from
 * the consultation page and the "you're booking with Dr. Siddiq" hint
 * cards.
 */
export const bookingLine =
  "When you reach the hospital, request a consultation with Dr. Ghulam Siddiq, Chief of Surgery.";

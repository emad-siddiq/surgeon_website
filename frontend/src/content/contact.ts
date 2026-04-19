/**
 * Contact information. Phone number and direct email are not published on
 * the original site — mark as TODO(content) until the practice supplies them.
 */
export const contact = {
  phone: {
    // TODO(content): confirm a public phone number with the practice.
    display: '+92 51 846 4646',
    tel: '+92518464646',
  },
  // TODO(content): confirm an external contact email (Shifa IH's general line
  // is currently the only verified public contact point).
  email: 'contact@drghulamsiddiq.com',

  clinic: {
    name: 'Shifa International Hospital',
    area: 'Islamabad, Pakistan',
    fullAddress: 'Shifa International Hospital, H-8/4, Islamabad, Pakistan',
    /**
     * Google Maps embed URL copied verbatim from the original site
     * (frontend/src/components/web/Location/Location.jsx at 0fb3280).
     * The API key shown here is the same key that was already shipping in
     * the public HTML — it is domain-restricted on the Maps console.
     * Rotate it on the Maps console and update this constant before launch.
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
  consultation: {
    // TODO(content): confirm the published fee and accepted insurance list.
    fee: 'Fee quoted at booking',
    insurance: 'Most major providers',
  },
  social: {
    facebook: 'https://facebook.com/dr.ghulamsiddiq',
    instagram: 'https://instagram.com/dr.ghulamsiddiq',
    youtube: 'https://youtube.com/@dr.ghulamsiddiq4770',
  },
} as const;

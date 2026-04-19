/**
 * Contact information. TODO(content): verify against the real practice
 * before shipping — the current values are from the style-guide placeholder.
 */
export const contact = {
  phone: {
    display: '+92 21 3555 0199',
    tel: '+922135550199',
  },
  email: 'hello@drsiddiq.pk',
  clinic: {
    name: 'Shifa Specialty Hospital',
    area: 'Clifton, Karachi',
    fullAddress: 'Shifa Specialty Hospital, Clifton, Karachi, Pakistan',
    // TODO(content): confirm coordinates and hospital-provided Google Maps embed URL.
    mapEmbed:
      'https://www.google.com/maps?q=Shifa%20Specialty%20Hospital%20Karachi&output=embed',
    geo: { lat: 24.817, lng: 67.031 },
  },
  hours: {
    days: 'Tue · Wed · Fri',
    time: 'Mornings, by appointment',
  },
  consultation: {
    // TODO(content): confirm fee and insurance list.
    fee: 'PKR 6,000 · billed at visit',
    insurance: 'Most major providers',
  },
} as const;

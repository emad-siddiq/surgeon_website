import { Helmet } from 'react-helmet-async';
import { contact } from '@/content/contact';
import { doctor } from '@/content/doctor';

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  /** OG image relative to the site root. */
  ogImage?: string;
  schema?: 'home' | 'about' | 'plain';
}

const SITE_URL = import.meta.env.SITE_URL ?? 'https://drsiddiq.example';
const DEFAULT_TITLE = `${doctor.fullName} \u2014 Laparoscopic & Bariatric Surgery, Karachi`;
const DEFAULT_DESCRIPTION = doctor.bioShort;

function jsonLdHome() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctor.fullName,
    medicalSpecialty: ['Bariatrics', 'Surgery'],
    description: doctor.bioShort,
    url: SITE_URL,
    telephone: contact.phone.tel,
    email: contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.clinic.name,
      addressLocality: 'Karachi',
      addressCountry: 'PK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: contact.clinic.geo.lat,
      longitude: contact.clinic.geo.lng,
    },
    priceRange: 'PKR',
  };
}

export function Seo({ title, description, path = '/', ogImage, schema = 'plain' }: SeoProps) {
  const fullTitle = title ? `${title} \u2014 ${doctor.fullName}` : DEFAULT_TITLE;
  const desc = description ?? DEFAULT_DESCRIPTION;
  const canonical = `${SITE_URL.replace(/\/$/, '')}${path}`;
  const ogImageUrl = ogImage ? `${SITE_URL}${ogImage}` : undefined;

  return (
    <Helmet>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      {ogImageUrl ? <meta property="og:image" content={ogImageUrl} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      {ogImageUrl ? <meta name="twitter:image" content={ogImageUrl} /> : null}

      {schema !== 'plain' ? (
        <script type="application/ld+json">{JSON.stringify(jsonLdHome())}</script>
      ) : null}
    </Helmet>
  );
}

import { DefaultSeoProps } from 'next-seo';
import { Organization, WithContext } from 'schema-dts';

export const defaultSEOConfig: DefaultSeoProps = {
  titleTemplate: '%s | Kynetic AS',
  defaultTitle: 'Kynetic AS | Kreative problemløsere – sammen med kunden',
  description: 'Kynetic AS er et kreativt byrå som spesialiserer seg på nettsider, konseptutvikling, 3D og animasjon, UX/UI design, systemutvikling, apputvikling, kunstig intelligens og markedsstrategi.',
  canonical: 'https://kynetic.no',
  openGraph: {
    type: 'website',
    locale: 'nb_NO',
    url: 'https://kynetic.no',
    siteName: 'Kynetic AS',
    images: [
      {
        url: 'https://kynetic.no/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kynetic AS',
      },
    ],
  },
  twitter: {
    handle: '@kynetic',
    site: '@kynetic',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'nettside, konseptutvikling, 3D, animasjon, UX/UI design, systemutvikling, apputvikling, kunstig intelligens, markedsstrategi, digital byrå, Norge',
    },
    {
      name: 'author',
      content: 'Kynetic AS',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#ffffff',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
  ],
};

export const organizationSchema: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Kynetic AS',
  url: 'https://kynetic.no',
  logo: 'https://kynetic.no/logo.png',
  sameAs: [
    'https://www.facebook.com/kynetic',
    'https://www.linkedin.com/company/kynetic',
    'https://www.instagram.com/kynetic',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+47-972-90-600',
    contactType: 'customer service',
    email: 'post@kynetic.no',
    areaServed: 'NO',
    availableLanguage: ['Norwegian', 'English'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Storgata 1',
    addressLocality: 'Oslo',
    postalCode: '0155',
    addressCountry: 'NO',
  },
}; 
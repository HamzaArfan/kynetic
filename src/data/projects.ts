export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  tech: { name: string; icon: string; iconColor?: string; iconType?: 'svg'|'text' }[];
  client: string;
  year: number;
  link: string;
  image: string;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    slug: 'xbilsenter',
    title: 'X Bilsenter',
    subtitle: 'I hjertet av Fetsund finner du en bilforhandler kjent for sitt brede utvalg og fokus på kundetilfredshet. For å styrke deres digitale tilstedeværelse har vi utviklet en moderne nettside med et stilrent design og praktiske funksjoner. Kundene kan enkelt finne informasjon om biler, fylle ut innbytteskjema og komme i kontakt med forhandleren.\n\nNettsiden er tilpasset både mobil og PC for å gjøre det enkelt for alle å bruke den. Dette prosjektet viser hvordan en brukervennlig digital løsning kan bidra til å nå ut til flere kunder og bygge gode relasjoner.',
    description: '',
    longDescription: '',
    image: '/xbil.jpg',
    imageAlt: 'X Bilsenter nettside skjermbilde',
    client: 'X Bilsenter',
    year: 2024,
    link: 'https://xbilsenter.no',
    tags: ['Nettside', 'CMS', 'Systemutvikling'],
    tech: [
      { name: 'Wordpress', icon: 'wordpress.png', iconType: 'svg', iconColor: '#272d2d' },
    ],
  },
  {
    slug: 'bilklar',
    title: 'Bilklar',
    subtitle: 'App for bilforhandlere med fokus på brukervennlighet og effektivitet.',
    description: '',
    longDescription: '',
    image: '/bilklaronkelig-scaled.jpg',
    imageAlt: 'Bilklar project image',
    client: 'Bilklar',
    year: 2023,
    link: 'https://bilklar.no',
    tags: ['Apputvikling', 'UX-UI'],
    tech: [
      { name: 'React Native', icon: 'React.png', iconType: 'svg', iconColor: '#272d2d' },
      { name: 'TypeScript', icon: 'ts.png', iconType: 'svg', iconColor: '#272d2d' },
    ],
  },
  {
    slug: 'azgartner',
    title: 'Az Gartner',
    subtitle: 'Visuell identitet og emballasjedesign for Az Gartner.',
    description: '',
    longDescription: '',
    image: '/azgartner-scaled.jpg',
    imageAlt: 'Az Gartner project image',
    client: 'Az Gartner',
    year: 2022,
    link: 'https://azgartner.no',
    tags: ['Nettside', 'CMS'],
    tech: [
      { name: 'Wordpress', icon: 'wordpress.png', iconType: 'svg', iconColor: '#272d2d' },
    ],
  },
  {
    slug: 'bilix',
    title: 'BiliX',
    subtitle: 'Emballasjedesignprosjekt med fokus på moderne visuell identitet og 3D-presentasjon.',
    description: '',
    longDescription: '',
    image: '/bilix1.jpg',
    imageAlt: 'BiliX project image',
    client: 'BiliX',
    year: 2024,
    link: 'https://bilix.no',
    tags: ['Grafisk profil', 'Emballasjedesign'],
    tech: [
      { name: 'React Native', icon: 'React.png', iconType: 'svg', iconColor: '#272d2d' },
      { name: 'TypeScript', icon: 'ts.png', iconType: 'svg', iconColor: '#272d2d' },
    ],
  },
]; 
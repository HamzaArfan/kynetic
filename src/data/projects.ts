export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
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
    subtitle: 'Bilklar er en applikasjon som hjelper privatpersoner å selge bilen sin enkelt og trygt – med samme service og trygghet som hos en bilforhandler. Vi har utviklet en brukervennlig plattform som gjør bilsalget effektivt, oversiktlig og tilgjengelig på mobil og nettbrett. Med Bilklar får brukerne profesjonell hjelp hele veien fra annonsering til salg.',
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
    subtitle: 'På Frosta finner du en erfaren aktør innen hagedesign, byggesøknader, prosjektering og miljøkartlegging. Vi har utviklet en moderne nettside som gir enkel tilgang til informasjon om deres brede tjenestespekter, fra hus og hytter til reguleringsplaner. Nettsiden er responsiv og brukervennlig, slik at både privatpersoner og bedrifter enkelt kan komme i kontakt og finne det de trenger. Dette digitale verktøyet styrker bedriftens profil og gjør det lettere å nå ut til nye kunder.',
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
    subtitle: 'Bilix er en pålitelig bruktbilforhandler med et stort utvalg biler og fokus på kundetilfredshet. Vi har laget en moderne og brukervennlig nettside som gjør det enkelt for kundene å se biler, sende inn ytteforespørsler og ta kontakt. Nettsiden fungerer sømløst på både mobil og PC, noe som sikrer en god brukeropplevelse uansett hvor du er. Med denne digitale løsningen kan Bilix nå flere kunder og styrke sitt omdømme i markedet.',
    description: '',
    longDescription: '',
    image: '/bilix1.jpg',
    imageAlt: 'BiliX project image',
    client: 'BiliX',
    year: 2024,
    link: 'https://bilix.no',
    tags: ['Nettside', 'Systemutvikling'],
    tech: [
      { name: 'React Native', icon: 'React.png', iconType: 'svg', iconColor: '#272d2d' },
      { name: 'TypeScript', icon: 'ts.png', iconType: 'svg', iconColor: '#272d2d' },
    ],
  },
]; 
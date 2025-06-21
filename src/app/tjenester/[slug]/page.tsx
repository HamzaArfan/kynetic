import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

const CONTAINER_WIDTH = 1600;

const serviceDetails = [
  {
    slug: "nettside",
    title: "Nettside",
    desc: "Nettsider som kombinerer design, funksjonalitet, brukervennlighet og helt rå ytelse.",
    longDesc: "Vi lager moderne, raske og brukervennlige nettsider som er skreddersydd for din bedrift. Vi fokuserer på design, ytelse og SEO, slik at du får en løsning som både ser bra ut og fungerer optimalt på alle flater.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "WordPress"],
    portfolioTags: ["Nettside"],
    process: [
      "Behovsavklaring og rådgivning",
      "Design og prototype",
      "Utvikling og implementering",
      "Testing og kvalitetssikring",
      "Lansering og support"
    ]
  },
  {
    slug: "nettbutikk",
    title: "Nettbutikk",
    desc: "Profesjonelle nettbutikker som gir kundene dine en sømløs handelsopplevelse.",
    longDesc: "Vi utvikler nettbutikker med fokus på konvertering, sikkerhet og brukervennlighet. Enten du trenger en enkel shop eller en avansert e-handelsløsning, hjelper vi deg hele veien fra idé til lansering.",
    tech: ["Shopify", "WooCommerce", "Next.js", "Stripe", "Sanity"],
    portfolioTags: ["Nettside", "CMS"],
    process: [
      "Kartlegging av behov og mål",
      "Design og struktur",
      "Utvikling av nettbutikk",
      "Integrasjon av betalingsløsninger",
      "Lansering og opplæring"
    ]
  },
  {
    slug: "konsept",
    title: "Konsept og idéutvikling",
    desc: "En god ide og et godt kreativt konsept skaper helhet og kontroll.",
    longDesc: "Vi hjelper deg å utvikle konsepter og idéer som gir prosjektet ditt en tydelig retning. Vi jobber tett med deg for å finne løsninger som er både kreative og gjennomførbare.",
    tech: ["Workshops", "Figma", "Miro"],
    portfolioTags: [],
    process: [
      "Workshop og idémyldring",
      "Konseptutvikling",
      "Visualisering og presentasjon",
      "Plan for videre arbeid"
    ]
  },
  {
    slug: "3d-animasjon",
    title: "3D og animasjon",
    desc: "Gjør idéene dine levende med 3D og animasjon, enten det er et konsept eller markedsføring.",
    longDesc: "Vi lager 3D-modeller, animasjoner og visuelle effekter for alt fra produktpresentasjoner til reklamefilmer. Vi gir liv til dine ideer med moderne verktøy og kreativt blikk.",
    tech: ["Blender", "3ds Max", "After Effects"],
    portfolioTags: ["3D", "Emballasjedesign"],
    process: [
      "Idé og storyboard",
      "3D-modellering",
      "Animasjon og effekter",
      "Render og levering"
    ]
  },
  {
    slug: "ux-ui",
    title: "UX/UI design",
    desc: "Sikre at kundene dine finner frem i løsningen deres samtidig som den er visuelt fin å se på.",
    longDesc: "Vi designer intuitive og vakre brukeropplevelser. Vi sørger for at løsningen din er enkel å bruke, samtidig som den ser profesjonell ut og bygger merkevaren din.",
    tech: ["Figma", "Adobe XD", "Sketch"],
    portfolioTags: ["UX-UI"],
    process: [
      "Kartlegging av brukerbehov",
      "Wireframes og prototyper",
      "Visuelt design",
      "Brukertesting og iterasjon"
    ]
  },
  {
    slug: "systemutvikling",
    title: "Systemutvikling",
    desc: "Det er mye å tenke på med systemutvikling, vi har erfaring med hva som funker og ikke...",
    longDesc: "Vi utvikler robuste og skalerbare systemer som støtter forretningsprosessene dine. Vi har erfaring med alt fra små integrasjoner til store, komplekse løsninger.",
    tech: ["Node.js", "Express", "SQLite", "REST API", "GraphQL"],
    portfolioTags: ["Systemutvikling"],
    process: [
      "Behovsanalyse",
      "Arkitektur og planlegging",
      "Utvikling",
      "Testing og kvalitetssikring",
      "Drift og vedlikehold"
    ]
  },
  {
    slug: "apputvikling",
    title: "Apputvikling",
    desc: "En app skal føles native og intuitiv på alle flater den brukes på, enten det er iOS eller...",
    longDesc: "Vi lager apper for både iOS og Android med fokus på ytelse og brukervennlighet. Vi bruker moderne rammeverk for å sikre at appen din fungerer sømløst på alle enheter.",
    tech: ["React Native", "Expo", "TypeScript", "Firebase"],
    portfolioTags: ["Apputvikling"],
    process: [
      "Idé og konsept",
      "Design og prototyping",
      "Utvikling",
      "Testing på ulike enheter",
      "Publisering i app stores"
    ]
  },
  {
    slug: "ki",
    title: "Kunstig intelligens",
    desc: "Riktig bruk av KI kan være med på å redusere de repetitive oppgavene og...",
    longDesc: "Vi hjelper deg å ta i bruk kunstig intelligens for å automatisere prosesser og skape nye muligheter. Vi har erfaring med maskinlæring, chatbots og dataanalyse.",
    tech: ["Python", "TensorFlow", "OpenAI", "LangChain"],
    portfolioTags: [],
    process: [
      "Behovsanalyse og datainnsamling",
      "Modellvalg og utvikling",
      "Trening og testing",
      "Implementering og oppfølging"
    ]
  },
  {
    slug: "markedsstrategi",
    title: "Markedsstategi",
    desc: "Du skal ikke undervurdere en god strategisk plan som kan hjelpe deg med å nå ut til fler...",
    longDesc: "Vi lager markedsstrategier som hjelper deg å nå ut til riktig målgruppe. Vi kombinerer analyse, kreativitet og erfaring for å skape resultater.",
    tech: ["Google Analytics", "Meta Ads", "SEO", "Mailchimp"],
    portfolioTags: [],
    process: [
      "Analyse av marked og målgruppe",
      "Strategiutvikling",
      "Tiltaksplan og gjennomføring",
      "Evaluering og optimalisering"
    ]
  },
  {
    slug: "annonsering",
    title: "Annonsering",
    desc: "Effektive annonser som når riktig målgruppe og gir resultater for din bedrift.",
    longDesc: "Vi lager annonser som konverterer – enten det er på Google, Facebook eller andre plattformer. Vi hjelper deg med alt fra strategi til ferdig annonse.",
    tech: ["Google Ads", "Meta Ads", "LinkedIn Ads"],
    portfolioTags: [],
    process: [
      "Målgruppeanalyse",
      "Annonseutforming",
      "Publisering",
      "Overvåkning og optimalisering"
    ]
  },
  {
    slug: "digital-markedsforing",
    title: "Digital Markedsføring",
    desc: "Strategisk digital markedsføring som bygger din merkevare og driver salg.",
    longDesc: "Vi hjelper deg å bygge en sterk digital tilstedeværelse. Vi jobber med alt fra innholdsproduksjon til annonsering og analyse.",
    tech: ["SEO", "Google Analytics", "Meta Ads", "Mailchimp"],
    portfolioTags: [],
    process: [
      "Strategi og planlegging",
      "Innholdsproduksjon",
      "Publisering og annonsering",
      "Analyse og rapportering"
    ]
  },
  {
    slug: "grafisk-design",
    title: "Grafisk Design",
    desc: "Profesjonelt grafisk design som kommuniserer budskapet ditt på en visuelt tiltalende måte.",
    longDesc: "Vi lager alt fra logoer til brosjyrer og emballasje. Vi sørger for at det visuelle uttrykket ditt er profesjonelt og konsistent.",
    tech: ["Adobe Illustrator", "Adobe InDesign", "Figma"],
    portfolioTags: ["Grafisk profil", "Emballasjedesign"],
    process: [
      "Behovskartlegging",
      "Idé og skisser",
      "Design og revisjon",
      "Leveranse av filer"
    ]
  },
  {
    slug: "grafisk-profil",
    title: "Grafisk Profil",
    desc: "En samlet og konsistent grafisk profil som styrker din merkevare og identitet.",
    longDesc: "Vi utvikler grafiske profiler som gir bedriften din en tydelig identitet. Vi lager alt fra logo til fargepalett og typografi.",
    tech: ["Adobe Illustrator", "Figma", "Brandbook"],
    portfolioTags: ["Grafisk profil"],
    process: [
      "Kartlegging av behov og merkevare",
      "Utvikling av visuell identitet",
      "Design av elementer",
      "Leveranse og brandbook"
    ]
  },
  {
    slug: "reklame",
    title: "Reklame",
    desc: "Kreative og effektive reklamekampanjer som skiller seg ut og når målgruppen.",
    longDesc: "Vi lager reklamekampanjer som får oppmerksomhet og gir resultater. Vi hjelper deg med alt fra idé til ferdig kampanje, både digitalt og på trykk.",
    tech: ["Adobe After Effects", "Meta Ads", "Google Ads"],
    portfolioTags: [],
    process: [
      "Idé og konsept",
      "Kampanjeplanlegging",
      "Produksjon",
      "Publisering og måling"
    ]
  },
];

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = serviceDetails.find(s => s.slug === params.slug);
  if (!service) return notFound();

  // Find relevant projects
  const relevantProjects = projects.filter(project =>
    service.portfolioTags.some(tag => project.tags.includes(tag))
  );

  return (
    <main className="bg-gray-50 min-h-screen w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full flex justify-center bg-gray-50 pt-8 md:pt-12 pb-8 md:pb-12">
        <div className="w-full px-4 md:px-0" style={{ maxWidth: CONTAINER_WIDTH }}>
          <div className="flex flex-col gap-4 mb-8 md:mb-12 md:ml-32">
            <h1 className="font-inter font-medium text-2xl md:text-[32.59px] leading-tight md:leading-[42.2px] text-gray-800">
              {service.title}
            </h1>
            <p className="text-base md:text-xl text-gray-500 mt-2">{service.desc}</p>
          </div>
        </div>
      </section>
      {/* Service Info Section */}
      <section className="w-full flex justify-center bg-white py-8">
        <div className="w-full flex flex-col gap-8" style={{ maxWidth: CONTAINER_WIDTH }}>
          <div className="bg-gray-50 rounded-2xl shadow p-8 border border-gray-100 w-full min-h-[200px] flex flex-col gap-6 items-start ml-32">
            <span className="text-gray-700 text-lg max-w-2xl">{service.longDesc}</span>
            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mt-2">
              {service.tech.map(tech => (
                <span key={tech} className="bg-green-100 text-green-900 text-sm font-semibold px-4 py-2 rounded-full border border-green-200">{tech}</span>
              ))}
            </div>
          </div>
          {/* Process Card */}
          {service.process && (
            <div className="bg-white rounded-2xl shadow p-8 border border-gray-100 w-full flex flex-col gap-4 items-start ml-32">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Slik jobber vi</h2>
              <ol className="flex flex-col gap-3 pl-2">
                {service.process.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-900 font-bold text-lg border border-green-200">{idx + 1}</span>
                    <span className="text-gray-700 text-base leading-snug">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {/* Portfolio Cards */}
          {relevantProjects.length > 0 && (
            <div className="flex flex-col gap-8 items-start ml-32 w-full">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Relevant portefølje</h2>
              <div className="grid md:grid-cols-2 gap-8 w-full">
                {relevantProjects.map(project => (
                  <Link key={project.slug} href={`/prosjekt/${project.slug}`} className="relative w-full flex justify-center cursor-pointer">
                    <div className="w-full rounded-2xl overflow-hidden shadow-xl" style={{ height: 320, minHeight: 320, maxHeight: 320 }}>
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        width={780}
                        height={320}
                        className="w-full h-[320px] object-cover"
                        priority={false}
                      />
                    </div>
                    <div className="absolute left-8 bottom-8 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 min-w-[240px] max-w-[80vw]">
                      <div className="flex gap-2 mb-1">
                        {project.tags.map(tag => (
                          <span key={tag} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-gray-900">{project.title}</span>
                        <span className="text-xl">→</span>
                      </div>
                      <div className="flex gap-4 items-center mt-1">
                        {project.tech.map(tech => (
                          <span key={tech.name} className="flex items-center gap-1 text-xs text-gray-500">{tech.name}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 
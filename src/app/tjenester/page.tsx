"use client";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

const CONTAINER_WIDTH = 1600;
const HERO_HEIGHT = 560;

export default function Tjenester() {
  return (
    <main className="bg-gray-50 min-h-screen w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full flex justify-center bg-gray-50 pt-8 md:pt-12 pb-8 md:pb-12">
        <div className="w-full px-4 md:px-0" style={{ maxWidth: CONTAINER_WIDTH }}>
          <div className="flex flex-col gap-4 mb-8 md:mb-12 md:ml-32">
            <h1 className="font-inter font-medium text-2xl md:text-[32.59px] leading-tight md:leading-[42.2px] text-gray-800">
              Våre tjenester
            </h1>
            <p className="text-base md:text-xl text-gray-500 mt-2">
              Vi liker å jobbe med mye forskjellig, så hos oss kan du ta prosjektet helt fra idéstadiet til ferdig produkt hvor alt henger sammen i en rød tråd.
            </p>
          </div>
        </div>
      </section>
      {/* Services Grid Section */}
      <section className="w-full flex justify-center bg-white py-8">
        <div className="w-full grid md:grid-cols-4 sm:grid-cols-2 gap-4" style={{ maxWidth: CONTAINER_WIDTH }}>
          {[
            { title: "Nettside", desc: "Nettsider som kombinerer design, funksjonalitet, brukervennlighet og helt rå ytelse.", href: "/tjenester/nettside" },
            { title: "Nettbutikk", desc: "Profesjonelle nettbutikker som gir kundene dine en sømløs handelsopplevelse.", href: "/tjenester/nettbutikk" },
            { title: "Konsept og idéutvikling", desc: "En god ide og et godt kreativt konsept skaper helhet og kontroll.", href: "/tjenester/konsept" },
            { title: "3D og animasjon", desc: "Gjør idéene dine levende med 3D og animasjon, enten det er et konsept eller markedsføring.", href: "/tjenester/3d-animasjon" },
            { title: "UX/UI design", desc: "Sikre at kundene dine finner frem i løsningen deres samtidig som den er visuelt fin å se på.", href: "/tjenester/ux-ui" },
            { title: "Systemutvikling", desc: "Det er mye å tenke på med systemutvikling, vi har erfaring med hva som funker og ikke...", href: "/tjenester/systemutvikling" },
            { title: "Apputvikling", desc: "En app skal føles native og intuitiv på alle flater den brukes på, enten det er iOS eller...", href: "/tjenester/apputvikling" },
            { title: "Kunstig intelligens", desc: "Riktig bruk av KI kan være med på å redusere de repetitive oppgavene og...", href: "/tjenester/ki" },
            { title: "Markedsstategi", desc: "Du skal ikke undervurdere en god strategisk plan som kan hjelpe deg med å nå ut til fler...", href: "/tjenester/markedsstrategi" },
            { title: "Annonsering", desc: "Effektive annonser som når riktig målgruppe og gir resultater for din bedrift.", href: "/tjenester/annonsering" },
            { title: "Digital Markedsføring", desc: "Strategisk digital markedsføring som bygger din merkevare og driver salg.", href: "/tjenester/digital-markedsforing" },
            { title: "Grafisk Design", desc: "Profesjonelt grafisk design som kommuniserer budskapet ditt på en visuelt tiltalende måte.", href: "/tjenester/grafisk-design" },
            { title: "Grafisk Profil", desc: "En samlet og konsistent grafisk profil som styrker din merkevare og identitet.", href: "/tjenester/grafisk-profil" },
            { title: "Reklame", desc: "Kreative og effektive reklamekampanjer som skiller seg ut og når målgruppen.", href: "/tjenester/reklame" },
          ].map((item, i) => (
            <Link 
              key={i} 
              href={item.href}
              className="bg-gray-50 rounded-2xl shadow p-4 sm:p-6 md:p-8 flex flex-col gap-2 border border-gray-100 w-full hover:shadow-lg hover:border-gray-200 transition-all duration-200"
            >
              <span className="font-semibold text-xl sm:text-2xl text-gray-800 flex items-center gap-2">
                {item.title} <span className="text-lg sm:text-xl">→</span>
              </span>
              <span className="text-sm sm:text-base text-gray-500 truncate">{item.desc}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
} 
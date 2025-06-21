"use client";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const CONTAINER_WIDTH = 1600;
const HERO_HEIGHT = 560;

// Parallax/Tilt hook for desktop
function useTilt(active: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!active || !ref.current) return;
    const node = ref.current;
    function handleMouseMove(e: MouseEvent) {
      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 8;
      const rotateY = ((centerX - x) / centerX) * 8;
      node.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
    }
    function handleMouseLeave() {
      node.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    }
    node.addEventListener("mousemove", handleMouseMove);
    node.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      node.removeEventListener("mousemove", handleMouseMove);
      node.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [active]);
  return ref;
}

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section aria-label="Hero" className="w-full flex justify-center bg-gray-50 pt-8 md:pt-12 pb-8 md:pb-12">
        <div className="w-full px-4 md:px-0" style={{ maxWidth: CONTAINER_WIDTH }}>
          <div className="flex flex-col gap-4 mb-8 md:mb-12 md:ml-32">
            <h1 className="font-inter font-medium text-2xl md:text-[32.59px] leading-tight md:leading-[42.2px] text-gray-800">
              Vi er kynetic. I over 10 år har vi laget løsninger
              som har skapt merverdi for kundene.
            </h1>
            <p className="text-base md:text-xl text-gray-500">
              Med lang erfaring vet vi hva som skal til for å lykkes med ditt prosjekt.
            </p>
            <Link href="/prisforslag" className="font-semibold text-gray-800 hover:underline flex items-center gap-1">
              Få et prisforslag <span aria-hidden>→</span>
            </Link>
          </div>
          {/* Featured Project */}
          <Link href="/prosjekt/xbilsenter" className="relative w-full flex justify-center mb-4 cursor-pointer">
            <div className="w-full rounded-2xl overflow-hidden shadow-xl" style={{ width: CONTAINER_WIDTH, height: HERO_HEIGHT }}>
              <Image
                src="/xbil.jpg"
                alt="X Bilsenter nettside skjermbilde"
                width={CONTAINER_WIDTH}
                height={HERO_HEIGHT}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            {/* Project Card */}
            <div className="absolute left-8 bottom-8 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 min-w-[320px] max-w-[90vw]">
              <div className="flex gap-2 mb-1">
                <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">Nettside</span>
                <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">CMS</span>
                <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">Systemutvikling</span>
              </div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-900">X Bilsenter</h2>
                <span className="text-xl" aria-hidden>→</span>
              </div>
              <div className="flex gap-4 items-center mt-1">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Image 
                    src="/wordpress.png"
                    alt="WordPress"
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                  <span style={{ color: '#272d2d' }}>WordPress</span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Projects Grid */}
      <section aria-label="Prosjekter" className="w-full flex justify-center bg-gray-50 pb-12">
        <div className="w-full grid md:grid-cols-2 gap-8" style={{ maxWidth: CONTAINER_WIDTH }}>
          {projects.filter(p => p.slug !== 'xbilsenter' && p.slug !== 'bilix').map((project, i) => {
            // Only enable tilt on desktop
            const [isDesktop, setIsDesktop] = useState(false);
            useEffect(() => {
              const check = () => setIsDesktop(window.innerWidth >= 768);
              check();
              window.addEventListener('resize', check);
              return () => window.removeEventListener('resize', check);
            }, []);
            const tiltRef = useTilt(isDesktop);
            return (
              <motion.div
                key={project.slug}
                ref={tiltRef}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                className={`relative w-full flex justify-center${i === 1 ? ' mt-0' : ''} cursor-pointer`}
              >
                <Link href={`/prosjekt/${project.slug}`} className="w-full">
                  <div className="w-full rounded-2xl overflow-hidden shadow-xl" style={{ height: 320, minHeight: 320, maxHeight: 320 }}>
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      width={780}
                      height={320}
                      className={`w-full h-[320px] object-cover${project.slug === 'bilklar' ? ' scale-105' : ''}`}
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
                      <h2 className="text-lg font-semibold text-gray-900">{project.title}</h2>
                      <span className="text-xl" aria-hidden>→</span>
                    </div>
                    <div className="flex gap-4 items-center mt-1">
                      {project.tech.map(tech => (
                        <span key={tech.name} className="flex items-center gap-1 text-xs text-gray-500">
                          {tech.iconType === 'svg' ? (
                            <Image 
                              src={`/${tech.icon}`}
                              alt={tech.name}
                              width={16}
                              height={16}
                              className="object-contain"
                            />
                          ) : (
                            <span style={{ color: tech.iconColor, fontWeight: 700 }}>{tech.icon}</span>
                          )}
                          <span style={{ color: tech.iconColor }}>{tech.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Project - BiliX */}
      <section aria-label="Utvalgt prosjekt" className="w-full flex justify-center bg-gray-50 pb-12">
        <div className="w-full relative flex justify-center" style={{ maxWidth: CONTAINER_WIDTH }}>
          <Link href="/prosjekt/bilix" className="w-full rounded-2xl overflow-hidden shadow-xl cursor-pointer" style={{ width: CONTAINER_WIDTH, height: HERO_HEIGHT }}>
            <Image
              src="/bilix1.jpg"
              alt="Bilix project image"
              width={CONTAINER_WIDTH}
              height={HERO_HEIGHT}
              className="w-full h-full object-cover object-[center_36.5%]"
              priority={false}
            />
          </Link>
          {/* Project Card */}
          <div className="absolute left-8 bottom-8 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 min-w-[320px] max-w-[90vw]">
            <div className="flex gap-2 mb-1">
              <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">Grafisk profil</span>
              <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">Emballasjedesign</span>
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">BiliX</h2>
              <span className="text-xl" aria-hidden>→</span>
            </div>
            <div className="flex gap-4 items-center mt-1">
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Image 
                  src="/React.png"
                  alt="React Native"
                  width={16}
                  height={16}
                  className="object-contain"
                />
                <span style={{ color: '#272d2d' }}>React Native</span>
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Image 
                  src="/ts.png"
                  alt="TypeScript"
                  width={16}
                  height={16}
                  className="object-contain"
                />
                <span style={{ color: '#272d2d' }}>TypeScript</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section aria-label="Tjenester" className="w-full flex justify-center bg-white py-8">
        <div className="w-full grid md:grid-cols-4 sm:grid-cols-2 gap-4" style={{ maxWidth: CONTAINER_WIDTH }}>
          {[
            { title: "Nettside", desc: "Nettsider som kombinerer design, funksjonalitet, brukervennlighet og helt rå ytelse.", href: "/tjenester/nettside" },
            { title: "Konsept og idéutvikling", desc: "En god ide og et godt kreativt konsept skaper helhet og kontroll.", href: "/tjenester/konsept" },
            { title: "3D og animasjon", desc: "Gjør idéene dine levende med 3D og animasjon, enten det er et konsept eller markedsføring.", href: "/tjenester/3d" },
            { title: "UX/UI design", desc: "Sikre at kundene dine finner frem i løsningen deres samtidig som den er visuelt fin å se på.", href: "/tjenester/design" },
            { title: "Systemutvikling", desc: "Det er mye å tenke på med systemutvikling, vi har erfaring med hva som funker og ikke...", href: "/tjenester/system" },
            { title: "Apputvikling", desc: "En app skal føles native og intuitiv på alle flater den brukes på, enten det er iOS eller...", href: "/tjenester/app" },
            { title: "Kunstig intelligens", desc: "Riktig bruk av KI kan være med på å redusere de repetitive oppgavene og...", href: "/tjenester/ki" },
            { title: "Markedsstategi", desc: "Du skal ikke undervurdere en god strategisk plan som kan hjelpe deg med å nå ut til fler...", href: "/tjenester/strategi" },
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

      {/* Testimonials Section */}
      <section aria-label="Anmeldelser" className="w-full flex justify-center bg-white py-8">
        <div className="w-full grid md:grid-cols-2 gap-4" style={{ maxWidth: CONTAINER_WIDTH }}>
          <blockquote className="bg-gray-50 rounded-2xl shadow p-8 flex flex-col items-start gap-4 border border-gray-100 w-full min-h-[200px]">
            <p className="text-gray-800 italic text-lg text-left">"Vi trengte en veldig enkel nettside, og vi fikk akkurat det vi så for oss."</p>
            <div className="flex-grow"></div>
            <footer className="text-gray-500 text-sm text-left leading-tight mt-auto w-full -mx-8 -mb-8 px-8 pb-8">
              <cite className="block font-semibold not-italic">Knut H. Brevik</cite>
              Daglig Leder, Az Gartner AS
            </footer>
          </blockquote>
          <blockquote className="bg-gray-50 rounded-2xl shadow p-8 flex flex-col items-start gap-4 border border-gray-100 w-full min-h-[200px]">
            <p className="text-gray-800 italic text-lg text-left">"Vi har brukt Kynetic i flere år nå, og det har alltid vært enkelt å få hjelp når vi trenger det."</p>
            <div className="flex-grow"></div>
            <footer className="text-gray-500 text-sm text-left leading-tight mt-auto w-full -mx-8 -mb-8 px-8 pb-8">
              <cite className="block font-semibold not-italic">Waleed Aftab</cite>
              Daglig Leder, X Bilsenter AS
            </footer>
          </blockquote>
        </div>
      </section>
    </>
  );
}

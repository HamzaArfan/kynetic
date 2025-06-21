"use client";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

const CONTAINER_WIDTH = 1600;
const HERO_HEIGHT = 560;

export default function Prosjekter() {
  return (
    <main className="bg-gray-50 min-h-screen w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full flex justify-center bg-gray-50 pt-8 md:pt-12 pb-8 md:pb-12">
        <div className="w-full px-4 md:px-0" style={{ maxWidth: CONTAINER_WIDTH }}>
          <div className="flex flex-col gap-4 mb-8 md:mb-12 md:ml-32">
            <h1 className="font-inter font-medium text-2xl md:text-[32.59px] leading-tight md:leading-[42.2px] text-gray-800">
              Våre prosjekter
            </h1>
            <p className="text-base md:text-xl text-gray-500 mt-2">
              Vi vil at kundene våre skal lykkes med det de jobber med, så vi lager ofte<br />
              flere prosjekter sammen. Her er noen utvalgte prosjekter du kan se gjennom.
            </p>
          </div>
          {/* First Large Image Section */}
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
            {/* Overlay Card */}
            <div className="absolute left-8 bottom-8 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 min-w-[320px] max-w-[90vw]">
              <div className="flex gap-2 mb-1">
                <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">Nettside</span>
                <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">CMS</span>
                <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">Systemutvikling</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-900">X Bilsenter</span>
                <span className="text-xl">→</span>
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
      {/* Full-width Project Showcases */}
      {projects.filter(p => p.slug !== 'xbilsenter' && p.slug !== 'bilix').map((project) => (
        <section key={project.slug} className="w-full flex justify-center bg-gray-50 pb-12">
          <div className="w-full relative flex justify-center" style={{ maxWidth: CONTAINER_WIDTH }}>
            <Link href={`/prosjekt/${project.slug}`} className="w-full rounded-2xl overflow-hidden shadow-xl cursor-pointer" style={{ width: CONTAINER_WIDTH, height: HERO_HEIGHT }}>
              <Image
                src={project.image}
                alt={project.imageAlt}
                width={CONTAINER_WIDTH}
                height={HERO_HEIGHT}
                className={`w-full h-full object-cover${project.slug === 'bilklar' ? ' scale-105' : ''}`}
                priority={false}
              />
            </Link>
            {/* Overlay Card */}
            <div className="absolute left-8 bottom-8 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 min-w-[320px] max-w-[90vw]">
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
          </div>
        </section>
      ))}
      {/* Second Large Image Section (Product Packaging) */}
      <section className="w-full flex justify-center bg-gray-50 pb-12">
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
          {/* Overlay Card */}
          <div className="absolute left-8 bottom-8 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 min-w-[320px] max-w-[90vw]">
            <div className="flex gap-2 mb-1">
              <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">Grafisk profil</span>
              <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">Emballasjedesign</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900">BiliX</span>
              <span className="text-xl">→</span>
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
    </main>
  );
} 
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import LegalLayout from '@/components/LegalLayout';

interface ServiceType {
  name: string;
  description: string;
  features: string[];
}

const services: ServiceType[] = [
  {
    name: "Nettsider og applikasjoner",
    description: "Utvikling og vedlikehold av digitale løsninger",
    features: ["Responsivt design", "Brukerdefinert funksjonalitet", "Optimalisert ytelse", "Sikkerhetsimplementering"]
  },
  {
    name: "Konsulenttjenester",
    description: "Faglig rådgivning og teknisk støtte",
    features: ["Teknisk rådgivning", "Prosjektledelse", "Kvalitetssikring", "Dokumentasjon"]
  },
  {
    name: "Vedlikehold og støtte",
    description: "Kontinuerlig drift og oppdatering av systemer",
    features: ["Teknisk støtte", "Sikkerhetsoppdateringer", "Ytelsesoptimalisering", "Feilsøking"]
  }
];

const navItems = [
  { href: "#vilkar", label: "Vilkår" },
  { href: "#bruk", label: "Bruk av tjenester" },
  { href: "#ansvar", label: "Ansvarsfraskrivelse" },
  { href: "#endringer", label: "Endringer i vilkårene" },
  { href: "#kontakt", label: "Kontakt oss" }
];

export default function Terms() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setOpenSection(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <LegalLayout title="Vilkår" navItems={navItems}>
      <h1 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
        Vilkår
      </h1>
      
      <div className="prose prose-base max-w-none">
        <p className="mb-6 text-gray-600">
          Disse vilkårene gjelder for bruk av våre tjenester og nettsider.
        </p>

        <div className="space-y-8">
          <motion.div 
            id="tjenester"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => toggleSection('tjenester')}
              className="w-full flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-all duration-200 group"
            >
              <h2 className="text-xl font-semibold flex items-center group-hover:text-green-600 transition-colors duration-200">
                <span className="text-green-600 mr-2">#</span>
                1. Tjenestene våre
              </h2>
              <ChevronDownIcon 
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  openSection === 'tjenester' ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {openSection === 'tjenester' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-white rounded-b-xl border-x border-b border-gray-200/50">
                    <div className="space-y-6">
                      {services.map((service, index) => (
                        <div key={index} className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                          <h3 className="text-base font-medium mb-2 text-gray-900">{service.name}</h3>
                          <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                          <div className="grid grid-cols-2 gap-2">
                            {service.features.map((feature, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <span className="text-green-600">•</span>
                                <span className="text-sm text-gray-600">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            id="ansvar"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => toggleSection('ansvar')}
              className="w-full flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-all duration-200 group"
            >
              <h2 className="text-xl font-semibold flex items-center group-hover:text-green-600 transition-colors duration-200">
                <span className="text-green-600 mr-2">#</span>
                2. Brukeransvar
              </h2>
              <ChevronDownIcon 
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  openSection === 'ansvar' ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {openSection === 'ansvar' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-white rounded-b-xl border-x border-b border-gray-200/50">
                    <div className="space-y-4">
                      <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Riktig bruk</h3>
                        <p className="text-sm text-gray-600">
                          Du er ansvarlig for å bruke våre tjenester i samsvar med gjeldende lover og regler, samt disse vilkårene.
                        </p>
                      </div>
                      <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Sikkerhet</h3>
                        <p className="text-sm text-gray-600">
                          Du er ansvarlig for å opprettholde sikkerheten til din konto og passord, samt å beskytte sensitive data.
                        </p>
                      </div>
                      <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Innhold</h3>
                        <p className="text-sm text-gray-600">
                          Du er ansvarlig for alt innhold du legger ut eller deler gjennom våre tjenester.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            id="eiendomsrett"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => toggleSection('eiendomsrett')}
              className="w-full flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-all duration-200 group"
            >
              <h2 className="text-xl font-semibold flex items-center group-hover:text-green-600 transition-colors duration-200">
                <span className="text-green-600 mr-2">#</span>
                3. Intellektuell eiendomsrett
              </h2>
              <ChevronDownIcon 
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  openSection === 'eiendomsrett' ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {openSection === 'eiendomsrett' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-white rounded-b-xl border-x border-b border-gray-200/50">
                    <div className="space-y-4">
                      <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Våre rettigheter</h3>
                        <p className="text-sm text-gray-600">
                          All intellektuell eiendomsrett knyttet til våre tjenester tilhører oss eller våre lisensgivere.
                        </p>
                      </div>
                      <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Dine rettigheter</h3>
                        <p className="text-sm text-gray-600">
                          Du beholder dine rettigheter til innhold du legger ut, men gir oss en lisens til å bruke det i forbindelse med våre tjenester.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            id="ansvarsfraskrivelse"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => toggleSection('ansvarsfraskrivelse')}
              className="w-full flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-all duration-200 group"
            >
              <h2 className="text-xl font-semibold flex items-center group-hover:text-green-600 transition-colors duration-200">
                <span className="text-green-600 mr-2">#</span>
                4. Ansvarsfraskrivelse
              </h2>
              <ChevronDownIcon 
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  openSection === 'ansvarsfraskrivelse' ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {openSection === 'ansvarsfraskrivelse' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-white rounded-b-xl border-x border-b border-gray-200/50">
                    <div className="space-y-4">
                      <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Tjenestene</h3>
                        <p className="text-sm text-gray-600">
                          Våre tjenester leveres "som de er" uten garantier av noe slag. Vi kan ikke garantere at tjenestene alltid vil være tilgjengelige eller feilfrie.
                        </p>
                      </div>
                      <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Indirekte skader</h3>
                        <p className="text-sm text-gray-600">
                          Vi er ikke ansvarlige for noen indirekte, tilfeldige, spesielle eller følgeskader som oppstår som følge av bruk av våre tjenester.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            id="endringer"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => toggleSection('endringer')}
              className="w-full flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-all duration-200 group"
            >
              <h2 className="text-xl font-semibold flex items-center group-hover:text-green-600 transition-colors duration-200">
                <span className="text-green-600 mr-2">#</span>
                5. Endringer i vilkårene
              </h2>
              <ChevronDownIcon 
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  openSection === 'endringer' ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {openSection === 'endringer' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-white rounded-b-xl border-x border-b border-gray-200/50">
                    <div className="space-y-4">
                      <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Endringer</h3>
                        <p className="text-sm text-gray-600">
                          Vi forbeholder oss retten til å endre disse vilkårene når som helst. Endringer vil bli varslet på våre nettsider.
                        </p>
                      </div>
                      <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Fortsettet bruk</h3>
                        <p className="text-sm text-gray-600">
                          Ved fortsatt bruk av våre tjenester etter endringer i vilkårene, godtar du de nye vilkårene.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            id="kontakt"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => toggleSection('kontakt')}
              className="w-full flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-all duration-200 group"
            >
              <h2 className="text-xl font-semibold flex items-center group-hover:text-green-600 transition-colors duration-200">
                <span className="text-green-600 mr-2">#</span>
                6. Kontakt oss
              </h2>
              <ChevronDownIcon 
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  openSection === 'kontakt' ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {openSection === 'kontakt' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-white rounded-b-xl border-x border-b border-gray-200/50">
                    <p className="text-sm text-gray-600 mb-4">
                      Hvis du har spørsmål om disse vilkårene, kan du kontakte oss på:
                    </p>
                    <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                      <p className="mb-2">Kynetic AS</p>
                      <p className="mb-2">Oscars gate 80</p>
                      <p className="mb-2">0256 Oslo</p>
                      <p className="mb-2">E-post: post@kynetic.no</p>
                      <p>Telefon: +47 972 90 600</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </LegalLayout>
  );
} 
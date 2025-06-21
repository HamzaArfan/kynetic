"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import LegalLayout from '@/components/LegalLayout';

interface CookieType {
  name: string;
  purpose: string;
  duration: string;
  provider: string;
}

const cookieTypes: CookieType[] = [
  {
    name: "Nødvendige informasjonskapsler",
    purpose: "Kritiske for nettstedets funksjonalitet",
    duration: "Sesjon",
    provider: "Kynetic"
  },
  {
    name: "Preferanseinformasjonskapsler",
    purpose: "Lagrer brukerpreferanser",
    duration: "1 år",
    provider: "Kynetic"
  },
  {
    name: "Statistikk",
    purpose: "Hjelper oss forstå hvordan nettstedet brukes",
    duration: "2 år",
    provider: "Google Analytics"
  },
  {
    name: "Markedsføring",
    purpose: "Brukes til å vise relevante annonser",
    duration: "1 år",
    provider: "Google Ads"
  }
];

const navItems = [
  { href: "#hva-er", label: "Hva er informasjonskapsler?" },
  { href: "#typer", label: "Typer informasjonskapsler" },
  { href: "#kontroll", label: "Kontroll av informasjonskapsler" },
  { href: "#endringer", label: "Endringer i retningslinjene" }
];

export default function Cookies() {
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
    <LegalLayout title="Cookies" navItems={navItems}>
      <h1 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
        Cookies
      </h1>
      
      <div className="prose prose-base max-w-none">
        <p className="mb-6 text-gray-600">
          Denne siden forklarer hvordan vi bruker informasjonskapsler på våre nettsider og hvordan du kan kontrollere dem.
        </p>

        <div className="space-y-8">
          <motion.div 
            id="hva-er"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => toggleSection('hva-er')}
              className="w-full flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-all duration-200 group"
            >
              <h2 className="text-xl font-semibold flex items-center group-hover:text-green-600 transition-colors duration-200">
                <span className="text-green-600 mr-2">#</span>
                1. Hva er informasjonskapsler?
              </h2>
              <ChevronDownIcon 
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  openSection === 'hva-er' ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {openSection === 'hva-er' && (
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
                        <h3 className="text-base font-medium mb-2 text-gray-900">Definisjon</h3>
                        <p className="text-sm text-gray-600">
                          Informasjonskapsler er små tekstfiler som lagres på din enhet når du besøker et nettsted. 
                          De hjelper nettstedet å huske informasjon om ditt besøk, som dine språkpreferanser og innstillinger.
                        </p>
                      </div>
                      <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Formål</h3>
                        <p className="text-sm text-gray-600">
                          Informasjonskapsler brukes for å forbedre brukeropplevelsen, analysere nettstedets ytelse, 
                          og tilby personlig tilpasset innhold og reklame.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            id="typer"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => toggleSection('typer')}
              className="w-full flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-all duration-200 group"
            >
              <h2 className="text-xl font-semibold flex items-center group-hover:text-green-600 transition-colors duration-200">
                <span className="text-green-600 mr-2">#</span>
                2. Typer informasjonskapsler
              </h2>
              <ChevronDownIcon 
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  openSection === 'typer' ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {openSection === 'typer' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-white rounded-b-xl border-x border-b border-gray-200/50">
                    <div className="space-y-6">
                      {cookieTypes.map((type, index) => (
                        <div key={index} className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                          <h3 className="text-base font-medium mb-2 text-gray-900">{type.name}</h3>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Formål:</span>
                              <p className="text-sm text-gray-600 mt-1">{type.purpose}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Varighet:</span>
                              <p className="text-sm text-gray-600 mt-1">{type.duration}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Leverandør:</span>
                              <p className="text-sm text-gray-600 mt-1">{type.provider}</p>
                            </div>
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
            id="kontroll"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => toggleSection('kontroll')}
              className="w-full flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-all duration-200 group"
            >
              <h2 className="text-xl font-semibold flex items-center group-hover:text-green-600 transition-colors duration-200">
                <span className="text-green-600 mr-2">#</span>
                3. Kontroll av informasjonskapsler
              </h2>
              <ChevronDownIcon 
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  openSection === 'kontroll' ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {openSection === 'kontroll' && (
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
                        <h3 className="text-base font-medium mb-2 text-gray-900">Nettleserinnstillinger</h3>
                        <p className="text-sm text-gray-600">
                          Du kan kontrollere og slette informasjonskapsler gjennom nettleserens innstillinger. 
                          Merk at dette kan påvirke funksjonaliteten på våre nettsider.
                        </p>
                      </div>
                      <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Samtykke</h3>
                        <p className="text-sm text-gray-600">
                          Ved ditt første besøk på nettstedet vil du bli bedt om å gi samtykke til bruk av informasjonskapsler. 
                          Du kan endre dine preferanser når som helst.
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
                4. Endringer i retningslinjene
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
                        <h3 className="text-base font-medium mb-2 text-gray-900">Oppdateringer</h3>
                        <p className="text-sm text-gray-600">
                          Vi kan oppdatere disse retningslinjene fra tid til annen. Eventuelle endringer vil bli publisert på denne siden.
                        </p>
                      </div>
                      <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Sist oppdatert</h3>
                        <p className="text-sm text-gray-600">
                          Disse retningslinjene ble sist oppdatert 1. januar 2024.
                        </p>
                      </div>
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
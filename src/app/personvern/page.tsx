"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import LegalLayout from '@/components/LegalLayout';

interface DataType {
  category: string;
  description: string;
  examples: string[];
}

const dataTypes: DataType[] = [
  {
    category: "Personlig informasjon",
    description: "Grunnleggende informasjon som identifiserer deg",
    examples: ["Navn", "E-postadresse", "Telefonnummer", "Postadresse"]
  },
  {
    category: "Bruksdata",
    description: "Informasjon om hvordan du bruker våre tjenester",
    examples: ["IP-adresse", "Nettleser type", "Besøkstidspunkt", "Sider besøkt"]
  },
  {
    category: "Kommunikasjon",
    description: "Informasjon fra vår kommunikasjon med deg",
    examples: ["E-poster", "Kundeservice henvendelser", "Tilbakemeldinger"]
  }
];

const navItems = [
  { href: "#personvern", label: "Personvern" },
  { href: "#data", label: "Personopplysninger" },
  { href: "#bruk", label: "Bruk av data" },
  { href: "#rettigheter", label: "Dine rettigheter" },
  { href: "#kontakt", label: "Kontakt oss" }
];

export default function PrivacyPolicy() {
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
    <LegalLayout title="Personvern" navItems={navItems}>
      <h1 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
        Personvern
      </h1>
      
      <div className="prose prose-base max-w-none">
        <p className="mb-6 text-gray-600">
          Denne personvernpolicyen forklarer hvordan vi samler inn, bruker og beskytter dine personopplysninger.
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
                1. Hva er personvern?
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
                          Personvern handler om hvordan vi håndterer og beskytter dine personopplysninger. 
                          Vi er forpliktet til å respektere ditt personvern og følge gjeldende personvernlovgivning.
                        </p>
                      </div>
                      <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Formål</h3>
                        <p className="text-sm text-gray-600">
                          Denne retningslinjen forklarer hvordan vi samler inn, bruker og beskytter dine personopplysninger 
                          når du bruker våre tjenester.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            id="data"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => toggleSection('data')}
              className="w-full flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-all duration-200 group"
            >
              <h2 className="text-xl font-semibold flex items-center group-hover:text-green-600 transition-colors duration-200">
                <span className="text-green-600 mr-2">#</span>
                2. Personopplysninger vi samler inn
              </h2>
              <ChevronDownIcon 
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  openSection === 'data' ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {openSection === 'data' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-white rounded-b-xl border-x border-b border-gray-200/50">
                    <div className="space-y-6">
                      {dataTypes.map((type, index) => (
                        <div key={index} className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                          <h3 className="text-base font-medium mb-2 text-gray-900">{type.category}</h3>
                          <p className="text-sm text-gray-600 mb-4">{type.description}</p>
                          <div className="grid grid-cols-2 gap-2">
                            {type.examples.map((example, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                {example}
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
            id="bruk"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => toggleSection('bruk')}
              className="w-full flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-all duration-200 group"
            >
              <h2 className="text-xl font-semibold flex items-center group-hover:text-green-600 transition-colors duration-200">
                <span className="text-green-600 mr-2">#</span>
                3. Hvordan vi bruker dataene
              </h2>
              <ChevronDownIcon 
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  openSection === 'bruk' ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {openSection === 'bruk' && (
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
                        <h3 className="text-base font-medium mb-2 text-gray-900">Forbedre våre tjenester</h3>
                        <p className="text-sm text-gray-600">
                          Vi bruker dataene til å forbedre våre nettsider og tjenester, og for å gi deg en bedre brukeropplevelse.
                        </p>
                      </div>
                      <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Kommunikasjon</h3>
                        <p className="text-sm text-gray-600">
                          Vi bruker kontaktinformasjonen din til å svare på henvendelser og sende viktige oppdateringer.
                        </p>
                      </div>
                      <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Analyse og statistikk</h3>
                        <p className="text-sm text-gray-600">
                          Vi analyserer bruksmønstre for å forbedre våre tjenester og forstå hvordan brukerne interagerer med våre nettsider.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            id="deling"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => toggleSection('deling')}
              className="w-full flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-all duration-200 group"
            >
              <h2 className="text-xl font-semibold flex items-center group-hover:text-green-600 transition-colors duration-200">
                <span className="text-green-600 mr-2">#</span>
                4. Deling av personopplysninger
              </h2>
              <ChevronDownIcon 
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  openSection === 'deling' ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {openSection === 'deling' && (
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
                        <h3 className="text-base font-medium mb-2 text-gray-900">Tilgang og oppdatering</h3>
                        <p className="text-sm text-gray-600">
                          Du har rett til å be om tilgang til dine personopplysninger og be om at feilaktige opplysninger blir rettet.
                        </p>
                      </div>
                      <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Sletting</h3>
                        <p className="text-sm text-gray-600">
                          Du kan be om at dine personopplysninger blir slettet når de ikke lenger er nødvendige.
                        </p>
                      </div>
                      <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Dataportabilitet</h3>
                        <p className="text-sm text-gray-600">
                          Du har rett til å motta dine personopplysninger i et strukturt, alminnelig brukt og maskinlesbart format.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            id="rettigheter"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => toggleSection('rettigheter')}
              className="w-full flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-all duration-200 group"
            >
              <h2 className="text-xl font-semibold flex items-center group-hover:text-green-600 transition-colors duration-200">
                <span className="text-green-600 mr-2">#</span>
                5. Dine rettigheter
              </h2>
              <ChevronDownIcon 
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  openSection === 'rettigheter' ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {openSection === 'rettigheter' && (
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
                        <h3 className="text-base font-medium mb-2 text-gray-900">Tilgang og oppdatering</h3>
                        <p className="text-sm text-gray-600">
                          Du har rett til å be om tilgang til dine personopplysninger og be om at feilaktige opplysninger blir rettet.
                        </p>
                      </div>
                      <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Sletting</h3>
                        <p className="text-sm text-gray-600">
                          Du kan be om at dine personopplysninger blir slettet når de ikke lenger er nødvendige.
                        </p>
                      </div>
                      <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Dataportabilitet</h3>
                        <p className="text-sm text-gray-600">
                          Du har rett til å motta dine personopplysninger i et strukturt, alminnelig brukt og maskinlesbart format.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            id="sikkerhet"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => toggleSection('sikkerhet')}
              className="w-full flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-all duration-200 group"
            >
              <h2 className="text-xl font-semibold flex items-center group-hover:text-green-600 transition-colors duration-200">
                <span className="text-green-600 mr-2">#</span>
                6. Datasikkerhet
              </h2>
              <ChevronDownIcon 
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  openSection === 'sikkerhet' ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {openSection === 'sikkerhet' && (
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
                        <h3 className="text-base font-medium mb-2 text-gray-900">Sikkerhetstiltak</h3>
                        <p className="text-sm text-gray-600">
                          Vi har implementert sikkerhetstiltak for å beskytte dine personopplysninger.
                        </p>
                      </div>
                      <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Dataansvarlig</h3>
                        <p className="text-sm text-gray-600">
                          Kynetic AS er ansvarlig for behandlingen av dine personopplysninger.
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
                7. Endringer i retningslinjene
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
                        <h3 className="text-base font-medium mb-2 text-gray-900">Endringer i retningslinjene</h3>
                        <p className="text-sm text-gray-600">
                          Vi forbeholder oss retten til å endre denne personvernretningslinjen.
                        </p>
                      </div>
                      <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Kontakt oss</h3>
                        <p className="text-sm text-gray-600">
                          Hvis du har spørsmål om vår behandling av personopplysninger, kan du kontakte oss på:
                        </p>
                        <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:border-green-200/50 transition-colors duration-200">
                          <p className="mb-2">Kynetic AS</p>
                          <p className="mb-2">Oscars gate 80</p>
                          <p className="mb-2">0256 Oslo</p>
                          <p className="mb-2">E-post: post@kynetic.no</p>
                          <p>Telefon: +47 972 90 600</p>
                        </div>
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
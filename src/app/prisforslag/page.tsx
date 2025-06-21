"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGlobe, FaShoppingCart, FaCheckCircle } from "react-icons/fa";

const steps = [
  "Type nettside",
  "Detaljer",
  "Kontaktinfo",
  "Bekreftelse"
];

const budgetOptions = [
  { label: "Under 30 000", value: "<30000" },
  { label: "30 000–60 000", value: "30000-60000" },
  { label: "60 000–100 000", value: "60000-100000" },
  { label: "100 000+", value: ">100000" },
];

const designOptions = [
  "Minimalistisk", "Fargerik", "Klassisk", "Moderne", "Mørk", "Lys"
];

const integrationOptions = [
  "Betalingsløsning", "Booking", "Nyhetsbrev", "Chat", "Google Analytics", "Annet"
];

type FormState = {
  type: string;
  pages: number;
  design: string[];
  integrations: string[];
  budget: string;
  ekstra: string;
  navn: string;
  bedrift: string;
  epost: string;
  telefon: string;
};

export default function Prisforslag() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    type: "",
    pages: 1,
    design: [],
    integrations: [],
    budget: "",
    ekstra: "",
    navn: "",
    bedrift: "",
    epost: "",
    telefon: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm({ ...form, [name]: type === "number" ? Number(value) : value });
  };

  const handleChipToggle = (name: string, value: string) => {
    setForm((prev) => {
      const arr = prev[name as keyof typeof prev] as string[];
      if (arr.includes(value)) {
        return { ...prev, [name]: arr.filter((v) => v !== value) };
      } else {
        return { ...prev, [name]: [...arr, value] };
      }
    });
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/price-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-12 px-4 bg-gray-50">
      <div className="w-full max-w-2xl">
        <div className="w-full bg-white rounded-2xl shadow p-10 border border-gray-200">
          <div className="mb-10">
            <div className="flex items-center justify-between mb-2">
              {steps.map((label, idx) => (
                <div key={label} className="flex-1 flex flex-col items-center">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full border ${idx === step ? 'border-green-900 bg-green-900 text-white' : 'border-gray-300 bg-white text-gray-400'} font-bold mb-1 transition-all duration-200`}>{idx + 1}</div>
                  <span className={`text-xs text-center mt-1 ${idx === step ? 'text-green-900 font-semibold' : 'text-gray-400'}`}>{label}</span>
                </div>
              ))}
            </div>
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-900 rounded-full transition-all duration-500" style={{width: `${((step+1)/steps.length)*100}%`}} />
            </div>
          </div>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-8"
                >
                  <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-900 p-4 rounded">
                    For andre tjenester og priser, ta kontakt med oss.
                  </div>
                  <label className="font-semibold text-gray-800 text-xl mb-2">Hva slags nettside ønsker du?</label>
                  <div className="flex gap-8">
                    {['Nettside', 'Nettbutikk'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, type }))}
                        className={`flex-1 border rounded-xl p-8 text-xl font-semibold transition focus:outline-none duration-200 ${form.type === type ? 'border-green-900 bg-green-50 text-green-900' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-8"
                >
                  <div>
                    <label className="font-medium text-gray-700 mb-2 block text-lg">Hvor mange sider trenger du?</label>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500 text-sm w-10">1</span>
                      <input
                        type="range"
                        name="pages"
                        min={1}
                        max={20}
                        value={form.pages}
                        onChange={handleChange}
                        className="flex-1 accent-green-900 h-2 rounded-lg appearance-none bg-gray-200"
                      />
                      <span className="text-gray-500 text-sm w-10 text-right">20+</span>
                      <span className="ml-4 font-bold text-green-900 text-xl min-w-[32px]">{form.pages}</span>
                    </div>
                  </div>
                  <div>
                    <label className="font-medium text-gray-700 mb-2 block text-lg">Budsjett</label>
                    <div className="flex gap-3 flex-wrap">
                      {budgetOptions.map(opt => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setForm(f => ({ ...f, budget: opt.value }))}
                          className={`px-6 py-3 rounded-full border transition text-base font-semibold duration-200 ${form.budget === opt.value ? 'bg-green-900 text-white border-green-900' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="font-medium text-gray-700 mb-2 block text-lg">Designpreferanser</label>
                    <div className="flex gap-2 flex-wrap">
                      {designOptions.map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleChipToggle('design', opt)}
                          className={`px-5 py-2 rounded-full border transition text-base font-medium duration-200 ${form.design.includes(opt) ? 'bg-green-900 text-white border-green-900' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="font-medium text-gray-700 mb-2 block text-lg">Integrasjoner</label>
                    <div className="flex gap-2 flex-wrap">
                      {integrationOptions.map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleChipToggle('integrations', opt)}
                          className={`px-5 py-2 rounded-full border transition text-base font-medium duration-200 ${form.integrations.includes(opt) ? 'bg-green-900 text-white border-green-900' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="font-medium text-gray-700 mb-1 block text-lg">Ekstra opplysninger</label>
                    <textarea name="ekstra" value={form.ekstra} onChange={handleChange} rows={2} className="w-full border border-gray-200 rounded-lg px-4 py-2" placeholder="Andre ønsker eller behov..." />
                  </div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-6"
                >
                  <label className="font-medium text-gray-700 text-lg">Fullt navn</label>
                  <input type="text" name="navn" value={form.navn} onChange={handleChange} required className="border border-gray-200 rounded-lg px-4 py-3 text-lg" />
                  <label className="font-medium text-gray-700 text-lg">Bedrift</label>
                  <input type="text" name="bedrift" value={form.bedrift} onChange={handleChange} required className="border border-gray-200 rounded-lg px-4 py-3 text-lg" />
                  <label className="font-medium text-gray-700 text-lg">E-post</label>
                  <input type="email" name="epost" value={form.epost} onChange={handleChange} required className="border border-gray-200 rounded-lg px-4 py-3 text-lg" />
                  <label className="font-medium text-gray-700 text-lg">Telefon</label>
                  <input type="tel" name="telefon" value={form.telefon} onChange={handleChange} required className="border border-gray-200 rounded-lg px-4 py-3 text-lg" />
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-6 items-center"
                >
                  <div className="text-green-900 text-2xl font-semibold mb-2 flex items-center gap-2">
                    Bekreft og send inn
                  </div>
                  <div className="text-gray-700 text-center">Trykk på "Send inn" for å sende forespørselen. Vi tar kontakt med deg med et prisforslag så snart som mulig.</div>
                  <div className="w-full mt-4 text-left text-base text-gray-600 bg-white rounded-xl p-4 border border-gray-200">
                    <div><b>Type:</b> {form.type}</div>
                    <div><b>Antall sider:</b> {form.pages}</div>
                    <div><b>Budsjett:</b> {budgetOptions.find(opt => opt.value === form.budget)?.label || form.budget}</div>
                    <div><b>Designpreferanser:</b> {form.design.join(', ')}</div>
                    <div><b>Integrasjoner:</b> {form.integrations.join(', ')}</div>
                    <div><b>Ekstra:</b> {form.ekstra}</div>
                    <div><b>Navn:</b> {form.navn}</div>
                    <div><b>Bedrift:</b> {form.bedrift}</div>
                    <div><b>E-post:</b> {form.epost}</div>
                    <div><b>Telefon:</b> {form.telefon}</div>
                  </div>
                </motion.div>
              )}
              </AnimatePresence>
              <div className="flex justify-between mt-8">
                {step > 0 && <button type="button" onClick={prevStep} className="px-7 py-3 rounded-lg border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-100 font-semibold shadow-sm transition-all duration-200">Tilbake</button>}
                {step < steps.length - 1 && <button type="button" onClick={nextStep} className="ml-auto px-7 py-3 rounded-lg bg-green-900 text-white font-bold shadow-lg hover:bg-green-800 active:bg-green-950 transition-all duration-200">Neste</button>}
                {step === steps.length - 1 && <button type="submit" className="ml-auto px-7 py-3 rounded-lg bg-green-900 text-white font-bold shadow-lg hover:bg-green-800 active:bg-green-950 transition-all duration-200">Send oss en melding</button>}
              </div>
            </form>
          ) : (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-6 py-16"
            >
              <div className="rounded-full bg-green-100 p-6 mb-2">
                <FaCheckCircle className="text-green-900 text-5xl" />
              </div>
              <div className="text-green-900 text-3xl font-bold">Takk for din forespørsel!</div>
              <div className="text-gray-700 text-center text-lg max-w-md">Vi har mottatt informasjonen din og tar kontakt med deg med et prisforslag så snart som mulig.</div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
} 
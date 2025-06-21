"use client";
import Image from "next/image";
import React, { useState } from "react";

const CONTAINER_WIDTH = 1600;

export default function KontaktOss() {
  const [form, setForm] = useState({
    navn: "",
    orgnr: "",
    bedrift: "",
    tjeneste: "",
    telefon: "",
    epost: "",
    ekstra: "",
  });
  const [errors, setErrors] = useState({
    navn: "",
    orgnr: "",
    bedrift: "",
    tjeneste: "",
    telefon: "",
    epost: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};
    if (!form.navn) newErrors.navn = "Fyll ut fullt navn";
    if (!form.orgnr) newErrors.orgnr = "Fyll ut organisasjonsnummer";
    if (!form.bedrift) newErrors.bedrift = "Fyll ut bedrift";
    if (!form.tjeneste) newErrors.tjeneste = "Velg en tjeneste";
    if (!form.telefon) newErrors.telefon = "Fyll ut telefonnummer";
    if (!form.epost) newErrors.epost = "Fyll ut e-post";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitStatus('idle');
      
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          setSubmitStatus('success');
          setForm({
            navn: "",
            orgnr: "",
            bedrift: "",
            tjeneste: "",
            telefon: "",
            epost: "",
            ekstra: "",
          });
        } else {
          setSubmitStatus('error');
        }
      } catch (error) {
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full flex justify-center bg-gray-50 pt-8 md:pt-12 pb-8 md:pb-12">
        <div className="w-full px-4 md:px-0" style={{ maxWidth: CONTAINER_WIDTH }}>
          <div className="flex flex-col gap-4 mb-8 md:mb-12 md:ml-32">
            <h1 className="font-inter font-medium text-2xl md:text-[32.59px] leading-tight md:leading-[42.2px] text-gray-800">
              Få et prisforslag
            </h1>
            <p className="text-base md:text-xl text-gray-500 mt-2">
              Vi liker å høre fra deg! Ta kontakt med oss for en uforpliktende prat om ditt prosjekt eller dine behov.
            </p>
          </div>
        </div>
      </section>
      {/* Contact Section: Form + Info */}
      <section className="w-full flex justify-center bg-white py-8">
        <div className="w-full flex flex-col md:flex-row gap-12 justify-center" style={{ maxWidth: CONTAINER_WIDTH }}>
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl shadow p-8 flex-1 border border-gray-100 flex flex-col gap-6 min-w-[320px]" style={{ minWidth: 0 }}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Kontakt oss</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-1">Fullt navn <span className='text-green-900'>*</span></label>
                  <input type="text" name="navn" autoComplete="name" value={form.navn} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.navn ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200`} required />
                  {errors.navn && <span className="text-green-900 text-sm mt-1">{errors.navn}</span>}
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-1">Organisasjonsnummer <span className='text-green-900'>*</span></label>
                  <input type="text" name="orgnr" autoComplete="organization-tax-id" value={form.orgnr} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.orgnr ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200`} required />
                  {errors.orgnr && <span className="text-green-900 text-sm mt-1">{errors.orgnr}</span>}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-1">Bedrift <span className='text-green-900'>*</span></label>
                  <input type="text" name="bedrift" autoComplete="organization" value={form.bedrift} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.bedrift ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200`} required />
                  {errors.bedrift && <span className="text-green-900 text-sm mt-1">{errors.bedrift}</span>}
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-1">Hvilken tjeneste <span className='text-green-900'>*</span></label>
                  <select name="tjeneste" value={form.tjeneste} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.tjeneste ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200`} required>
                    <option value="">Velg en tjeneste</option>
                    <option value="Nettside">Nettside</option>
                    <option value="Konsept og idéutvikling">Konsept og idéutvikling</option>
                    <option value="3D og animasjon">3D og animasjon</option>
                    <option value="UX/UI design">UX/UI design</option>
                    <option value="Systemutvikling">Systemutvikling</option>
                    <option value="Apputvikling">Apputvikling</option>
                    <option value="Kunstig intelligens">Kunstig intelligens</option>
                    <option value="Markedsstrategi">Markedsstrategi</option>
                    <option value="Annet">Annet</option>
                  </select>
                  {errors.tjeneste && <span className="text-green-900 text-sm mt-1">{errors.tjeneste}</span>}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-1">Telefon <span className='text-green-900'>*</span></label>
                  <input type="tel" name="telefon" autoComplete="tel" value={form.telefon} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.telefon ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200`} required />
                  {errors.telefon && <span className="text-green-900 text-sm mt-1">{errors.telefon}</span>}
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-1">E-post <span className='text-green-900'>*</span></label>
                  <input type="email" name="epost" autoComplete="email" value={form.epost} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.epost ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200`} required />
                  {errors.epost && <span className="text-green-900 text-sm mt-1">{errors.epost}</span>}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Ekstra opplysninger</label>
                <textarea name="ekstra" value={form.ekstra} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200" />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`mt-4 bg-green-900 text-white font-semibold py-3 rounded-lg transition ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-800'
              }`}
            >
              {isSubmitting ? 'Sender...' : 'Send inn'}
            </button>
            {submitStatus === 'success' && (
              <p className="text-green-900 mt-2">Takk for din henvendelse! Vi vil kontakte deg snart.</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-500 mt-2">Beklager, det oppstod en feil. Vennligst prøv igjen senere.</p>
            )}
          </form>
          {/* Map and Info */}
          <div className="flex-1 flex flex-col gap-6 min-w-[320px]">
            <div className="rounded-2xl overflow-hidden shadow border border-gray-100 w-full h-64 md:h-full min-h-[256px]">
              <iframe
                title="Kynetic Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2004.857964073964!2d10.7167!3d59.9206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416e62e5b2b1b1%3A0x7d7b7b7b7b7b7b7b!2sOscars%20gate%2080%2C%200256%20Oslo!5e0!3m2!1sen!2sno!4v1685555555555!5m2!1sen!2sno"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="bg-gray-50 rounded-2xl shadow p-6 border border-gray-100 flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Åpningstider</h3>
              <div className="text-gray-700">
                <div>Mandag–Fredag: 09:00–16:00</div>
                <div>Lørdag–Søndag: Stengt</div>
              </div>
              <div className="mt-4">
                <span className="block font-semibold text-gray-800">E-post:</span>
                <a href="mailto:hei@kynetic.no" className="text-green-900 hover:underline">hei@kynetic.no</a>
              </div>
              <div>
                <span className="block font-semibold text-gray-800">Telefon:</span>
                <a href="tel:+4797290600" className="text-green-900 hover:underline">+47 972 90 600</a>
              </div>
              <div>
                <span className="block font-semibold text-gray-800">Adresse:</span>
                <span className="text-gray-700">Oscars gate 80, 0256 Oslo</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 
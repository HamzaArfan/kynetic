"use client";
import { useState } from 'react';
import { sendEmail } from '@/utils/email';

interface CalculatorData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  estimatedPrice: string;
  details: {
    [key: string]: any;
  };
}

export default function PriceCalculator() {
  const [formData, setFormData] = useState<CalculatorData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    estimatedPrice: '',
    details: {}
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await sendEmail({
        type: 'calculator',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectType: formData.projectType,
        estimatedPrice: formData.estimatedPrice
      });
      setStatus('success');
      setMessage('Takk for din henvendelse! Vi vil kontakte deg snart med en detaljert prisestimering.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        estimatedPrice: '',
        details: {}
      });
    } catch (error) {
      setStatus('error');
      setMessage('Noe gikk galt. Vennligst prøv igjen.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Navn
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          E-post
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Telefon
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">
          Prosjekttype
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">Velg prosjekttype</option>
          <option value="nettside">Nettside</option>
          <option value="app">App</option>
          <option value="system">Systemutvikling</option>
          <option value="design">UX/UI Design</option>
          <option value="3d">3D og animasjon</option>
          <option value="annet">Annet</option>
        </select>
      </div>

      <div>
        <label htmlFor="estimatedPrice" className="block text-sm font-medium text-gray-700">
          Estimert pris
        </label>
        <input
          type="text"
          id="estimatedPrice"
          name="estimatedPrice"
          value={formData.estimatedPrice}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-6 py-3 text-base font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sender...' : 'Send prisestimering'}
      </button>

      {message && (
        <p className={`text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </form>
  );
} 
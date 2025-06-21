"use client";
import { useState } from 'react';
import { sendEmail } from '@/utils/email';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await sendEmail('newsletter', { email });
      setStatus('success');
      setMessage('Takk for din registrering!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Noe gikk galt. Vennligst prøv igjen.');
    }
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900">
            Hold deg oppdatert
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Meld deg på vårt nyhetsbrev for å få de siste nyhetene og tilbudene.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
          <div className="flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Din e-postadresse"
              required
              className="flex-1 min-w-0 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex-shrink-0 px-6 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sender...' : 'Meld på'}
            </button>
          </div>
          {message && (
            <p className={`mt-2 text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
} 
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Side ikke funnet',
  description: 'Beklager, men siden du leter etter kunne ikke bli funnet.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Side ikke funnet</h1>
      <p className="text-lg text-gray-600 mb-8">
        Beklager, men siden du leter etter kunne ikke bli funnet.
      </p>
      <Link 
        href="/"
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
      >
        Gå til forsiden
      </Link>
    </div>
  );
} 
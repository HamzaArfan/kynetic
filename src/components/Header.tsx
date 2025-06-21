"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const langs = [
    { label: 'Norsk', flag: '🇳🇴' },
    { label: 'English', flag: '🇬🇧' },
    { label: 'Svenska', flag: '🇸🇪' },
    { label: 'Dansk', flag: '🇩🇰' },
  ];
  const [selectedLang, setSelectedLang] = useState(langs[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-gray-50 py-4 px-4 md:py-6 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src="/kynetic.svg" alt="Kynetic Logo" width={120} height={40} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Navigation */}
        <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-[72px] md:top-0 left-0 right-0 md:left-auto md:right-auto flex-col md:flex-row items-center gap-4 bg-gray-50 md:bg-transparent p-4 md:p-0 shadow-lg md:shadow-none z-50`}>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-gray-800 font-medium text-lg">
            <Link href="/tjenester" className="w-full md:w-auto text-center hover:text-black transition">Tjenester</Link>
            <Link href="/prosjekter" className="w-full md:w-auto text-center hover:text-black transition">Prosjekter</Link>
          </div>
          <Link 
            href="/kontakt-oss" 
            className="w-full md:w-auto text-center px-6 py-2 border border-gray-400 rounded-full font-medium text-gray-800 hover:bg-gray-100 transition h-[44px] flex items-center justify-center"
          >
            Kontakt oss
          </Link>
        </nav>
      </div>
    </header>
  );
} 
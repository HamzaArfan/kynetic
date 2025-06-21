"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";

const CONTAINER_WIDTH = 1600;

export default function Footer() {
  return (
    <footer className="w-full flex justify-center mt-8 md:mt-16 mb-8 md:mb-16 px-4 md:px-8">
      <div className="w-full" style={{ maxWidth: CONTAINER_WIDTH }}>
        <div className="bg-green-900 text-white rounded-[2rem] px-6 md:px-8 py-12 shadow-2xl transform hover:scale-[1.01] transition-transform duration-300">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold mb-2 text-white">Kontakt</h3>
              <a href="mailto:post@kynetic.no" className="opacity-70 hover:opacity-100 transition-opacity">post@kynetic.no</a>
              <a href="tel:+4797290600" className="opacity-70 hover:opacity-100 transition-opacity">+47 972 90 600</a>
              <span className="opacity-70">Oscars gate 80, 0256 Oslo</span>
              <div className="flex gap-4 mt-4">
                <a 
                  href="https://linkedin.com/company/kynetic" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-green-900 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="w-4 h-4" />
                </a>
                <a 
                  href="https://facebook.com/kynetic" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-green-900 transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a 
                  href="https://instagram.com/kynetic" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-green-900 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold mb-2 text-white">Tjenester</h3>
              <Link href="/tjenester" className="opacity-70 hover:opacity-100 transition-opacity">Alle tjenester</Link>
              <Link href="/tjenester/nettside" className="opacity-70 hover:opacity-100 transition-opacity">Nettside</Link>
              <Link href="/tjenester/apputvikling" className="opacity-70 hover:opacity-100 transition-opacity">Apputvikling</Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold mb-2 text-white">Prosjekter</h3>
              <Link href="/prosjekter" className="opacity-70 hover:opacity-100 transition-opacity">Alle prosjekter</Link>
              <Link href="/prosjekt/xbilsenter" className="opacity-70 hover:opacity-100 transition-opacity">X Bilsenter</Link>
              <Link href="/prosjekt/bilix" className="opacity-70 hover:opacity-100 transition-opacity">BiliX</Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold mb-2 text-white">Mer</h3>
              <Link href="/kontakt" className="opacity-70 hover:opacity-100 transition-opacity">Kontakt oss</Link>
              <Link href="/prisforslag" className="opacity-70 hover:opacity-100 transition-opacity">Prisforslag</Link>
              <Link href="/personvern" className="opacity-70 hover:opacity-100 transition-opacity">Personvern</Link>
            </div>
          </div>

          {/* Bottom Section - Legal */}
          <div className="border-t border-green-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="text-sm opacity-60">&copy; 2025 Kynetic AS. Alle rettigheter reservert.</span>
              <div className="flex gap-6">
                <Link href="/personvern" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                  Personvern
                </Link>
                <Link href="/cookies" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                  Cookies
                </Link>
                <Link href="/vilkar" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                  Vilkår
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 
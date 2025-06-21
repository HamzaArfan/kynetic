"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface LegalLayoutProps {
  children: React.ReactNode;
  title: string;
  navItems: {
    href: string;
    label: string;
  }[];
}

export default function LegalLayout({ children, title, navItems }: LegalLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200/50">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-gray-600 hover:text-green-600 transition-colors"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          <div className="w-10" /> {/* Spacer for balance */}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />
            {/* Sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-white/90 backdrop-blur-lg border-r border-gray-200/50 z-50 md:hidden"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <Link 
                    href="/" 
                    className="flex items-center gap-2 text-gray-600 hover:text-green-600 group transition-colors duration-200"
                  >
                    <span className="transform rotate-180 text-xl group-hover:-translate-x-1 transition-transform duration-200">→</span>
                    <span className="text-sm font-medium">Tilbake til hjem</span>
                  </Link>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                <nav className="space-y-1">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Innhold
                  </h3>
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className="block text-gray-600 hover:text-green-600 hover:bg-gray-50/50 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 bg-white/90 backdrop-blur-lg border-r border-gray-200/50 min-h-screen sticky top-0">
          <div className="p-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-600 hover:text-green-600 mb-6 group transition-colors duration-200"
            >
              <span className="transform rotate-180 text-xl group-hover:-translate-x-1 transition-transform duration-200">→</span>
              <span className="text-sm font-medium">Tilbake til hjem</span>
            </Link>
            <nav className="space-y-1">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Innhold
              </h3>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-gray-600 hover:text-green-600 hover:bg-gray-50/50 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 mt-16 md:mt-0">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-4 md:p-8 border border-gray-200/50"
            >
              {children}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 
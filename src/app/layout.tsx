import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "@/components/HeaderWrapper";
import Footer from "@/components/Footer";
import SEOProvider from "@/components/SEOProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kynetic.no'),
  title: {
    default: 'Kynetic AS | Kreative problemløsere – sammen med kunden',
    template: '%s | Kynetic AS',
  },
  description: 'Kynetic AS er et kreativt byrå som spesialiserer seg på nettsider, konseptutvikling, 3D og animasjon, UX/UI design, systemutvikling, apputvikling, kunstig intelligens og markedsstrategi.',
  keywords: ['nettside', 'konseptutvikling', '3D', 'animasjon', 'UX/UI design', 'systemutvikling', 'apputvikling', 'kunstig intelligens', 'markedsstrategi', 'digital byrå', 'Norge'],
  authors: [{ name: 'Kynetic AS' }],
  creator: 'Kynetic AS',
  publisher: 'Kynetic AS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'nb_NO',
    url: 'https://kynetic.no',
    siteName: 'Kynetic AS',
    title: 'Kynetic AS | Kreative problemløsere – sammen med kunden',
    description: 'Kynetic AS er et kreativt byrå som spesialiserer seg på nettsider, konseptutvikling, 3D og animasjon, UX/UI design, systemutvikling, apputvikling, kunstig intelligens og markedsstrategi.',
    images: [
      {
        url: 'https://kynetic.no/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kynetic AS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kynetic AS | Kreative problemløsere – sammen med kunden',
    description: 'Kynetic AS er et kreativt byrå som spesialiserer seg på nettsider, konseptutvikling, 3D og animasjon, UX/UI design, systemutvikling, apputvikling, kunstig intelligens og markedsstrategi.',
    images: ['https://kynetic.no/og-image.jpg'],
    creator: '@kynetic',
    site: '@kynetic',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
    yahoo: 'your-yahoo-verification',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-white dark:bg-gray-900`} suppressHydrationWarning>
        <SEOProvider />
        <HeaderWrapper />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
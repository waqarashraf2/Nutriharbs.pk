import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export const metadata: Metadata = {
  metadataBase: new URL('https://nutriherbs.pk'),
  title: 'Nutriherbs | All Pure - All Natural Herbal Supplements Pakistan',
  description: 'Shop 100% pure botanical nutraceuticals, marine collagen, biotin, calcium & multivitamins. DRAP enlisted, certified GMP labs with nationwide Cash on Delivery in Pakistan.',
  keywords: [
    'Nutriherbs Pakistan',
    'herbal supplements Pakistan',
    'DRAP enlisted supplements',
    'marine collagen peptides',
    'biotin for hair fall',
    'red algae calcium',
    'organic dietary supplements',
    'COD supplements Pakistan'
  ],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Nutriherbs - All Pure, All Natural',
    description: 'Pakistan\'s premier herbal nutraceutical brand. Free delivery on orders above Rs. 2,000.',
    url: 'https://nutriherbs.pk',
    siteName: 'Nutriherbs Pakistan',
    images: [
      {
        url: '/images/logo.png',
        width: 800,
        height: 600,
        alt: 'Nutriherbs Pakistan Official Logo',
      },
    ],
    locale: 'en_PK',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Pharmacy',
    name: 'Nutriherbs Pakistan',
    alternateName: 'Nutriherbs All Pure All Natural',
    url: 'https://nutriherbs.pk',
    logo: 'https://nutriherbs.pk/images/logo.png',
    description: 'Premier herbal nutraceuticals, pure botanical extracts, and dietary supplements in Pakistan.',
    telephone: '+92-300-1234567',
    priceRange: 'PKR 1450 - PKR 3500',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PK',
      addressRegion: 'Punjab / Sindh',
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-white text-slate-800">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}

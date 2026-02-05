import type { Metadata } from 'next';
import { Noto_Sans, Noto_Sans_Mono, Noto_Serif } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://chinese-name-gen.vercel.app';

const displayFont = Noto_Serif({
  variable: '--font-headline',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const bodyFont = Noto_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const monoFont = Noto_Sans_Mono({
  variable: '--font-code',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Chinese Name Generator | Authentic AI-Powered Names',
  description: 'Create meaningful, culturally accurate Chinese names with AI. Explore historical legends from the Qin, Han, and Tang dynasties.',
  keywords: ['Chinese name', 'name generator', 'historical figures', 'Chinese culture', 'AI names', 'pinyin'],
  authors: [{ name: 'NameGen Team' }],
  openGraph: {
    title: 'Chinese Name Generator | Find Your Identity',
    description: 'Generate meaningful Chinese names using AI or explore historical figures from across dynasties.',
    url: siteUrl,
    siteName: 'Chinese Name Generator',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chinese Name Generator | Authentic AI Names',
    description: 'Create meaningful Chinese names with AI and explore history.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Noto_Sans, Noto_Sans_Mono, Noto_Serif } from 'next/font/google';
import Script from 'next/script';
import { getLocale } from 'next-intl/server';
import {
  PRIMARY_SEO_KEYWORD,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_TWITTER_IMAGE,
  SITE_URL,
} from '@/lib/seo';
import './globals.css';

const BASE_LOCALE = 'en' as const;

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME[BASE_LOCALE],
    template: `%s | ${SITE_NAME[BASE_LOCALE]}`,
  },
  description: SITE_DESCRIPTION[BASE_LOCALE],
  applicationName: SITE_NAME[BASE_LOCALE],
  keywords: SITE_KEYWORDS[BASE_LOCALE],
  alternates: {
    canonical: '/en',
  },
  openGraph: {
    title: SITE_NAME[BASE_LOCALE],
    description: SITE_DESCRIPTION[BASE_LOCALE],
    url: '/en',
    siteName: SITE_NAME[BASE_LOCALE],
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME[BASE_LOCALE]} preview image`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME[BASE_LOCALE],
    description: SITE_DESCRIPTION[BASE_LOCALE],
    images: [SITE_TWITTER_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' },
    ],
    shortcut: ['/favicon.ico'],
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME[BASE_LOCALE],
  url: SITE_URL,
  description: SITE_DESCRIPTION[BASE_LOCALE],
  keywords: PRIMARY_SEO_KEYWORD,
};

export default async function RootLayout(
  { children }: Readonly<{ children: React.ReactNode }>
) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} antialiased`}>
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          defer
          src="https://umami-ten-khaki-92.vercel.app/script.js"
          data-website-id="a0199c59-61cd-462f-a725-682c2818a94f"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import {
  PRIMARY_SEO_KEYWORD,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  toSafeLocale,
} from '@/lib/seo';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function MainLayout({ children, params }: Props) {
  const { locale } = await params;
  const safeLocale = toSafeLocale(locale);
  const localeUrl = `${SITE_URL}/${safeLocale}`;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME[safeLocale],
      url: localeUrl,
      inLanguage: safeLocale,
      description: SITE_DESCRIPTION[safeLocale],
      keywords: PRIMARY_SEO_KEYWORD,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: SITE_NAME[safeLocale],
      url: localeUrl,
      inLanguage: safeLocale,
      description: SITE_DESCRIPTION[safeLocale],
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="relative z-10 flex-1 container mx-auto px-6 py-8 sm:px-8 lg:px-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}

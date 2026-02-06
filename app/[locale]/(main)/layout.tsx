import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SITE_NAME, SITE_URL, toSafeLocale } from '@/lib/seo';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function MainLayout({ children, params }: Props) {
  const { locale } = await params;
  const safeLocale = toSafeLocale(locale);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME[safeLocale],
    url: `${SITE_URL}/${safeLocale}`,
    inLanguage: safeLocale,
  };

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

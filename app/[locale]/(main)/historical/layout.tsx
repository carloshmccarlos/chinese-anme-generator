import type { Metadata } from 'next';
import {
  buildLanguageAlternates,
  OG_LOCALE,
  PAGE_DESCRIPTION,
  PAGE_TITLE,
  SITE_NAME,
  toSafeLocale,
} from '@/lib/seo';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = toSafeLocale(locale);
  const title = PAGE_TITLE.historical[safeLocale];
  const description = PAGE_DESCRIPTION.historical[safeLocale];

  return {
    title,
    description,
    alternates: {
      canonical: `/${safeLocale}/historical`,
      languages: buildLanguageAlternates('/historical'),
    },
    openGraph: {
      title,
      description,
      url: `/${safeLocale}/historical`,
      siteName: SITE_NAME[safeLocale],
      locale: OG_LOCALE[safeLocale],
      type: 'website',
    },
  };
}

export default function HistoricalLayout({ children }: Props) {
  return children;
}

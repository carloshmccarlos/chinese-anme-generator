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
  const title = PAGE_TITLE.modern[safeLocale];
  const description = PAGE_DESCRIPTION.modern[safeLocale];

  return {
    title,
    description,
    alternates: {
      canonical: `/${safeLocale}/modern`,
      languages: buildLanguageAlternates('/modern'),
    },
    openGraph: {
      title,
      description,
      url: `/${safeLocale}/modern`,
      siteName: SITE_NAME[safeLocale],
      locale: OG_LOCALE[safeLocale],
      type: 'website',
    },
  };
}

export default function ModernLayout({ children }: Props) {
  return children;
}

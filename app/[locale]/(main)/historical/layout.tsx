import type { Metadata } from 'next';
import {
  buildLanguageAlternates,
  OG_LOCALE,
  PAGE_DESCRIPTION,
  PAGE_KEYWORDS,
  PAGE_TITLE,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_TWITTER_IMAGE,
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
    keywords: PAGE_KEYWORDS.historical[safeLocale],
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
      images: [
        {
          url: SITE_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME[safeLocale]} historical names preview image`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SITE_TWITTER_IMAGE],
    },
  };
}

export default function HistoricalLayout({ children }: Props) {
  return children;
}

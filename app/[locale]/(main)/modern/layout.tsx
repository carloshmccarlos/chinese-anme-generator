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
  const title = PAGE_TITLE.modern[safeLocale];
  const description = PAGE_DESCRIPTION.modern[safeLocale];

  return {
    title,
    description,
    keywords: PAGE_KEYWORDS.modern[safeLocale],
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
      images: [
        {
          url: SITE_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME[safeLocale]} modern names preview image`,
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

export default function ModernLayout({ children }: Props) {
  return children;
}

import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const rootEntry = {
    url: SITE_URL,
    lastModified,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  };

  const localeEntries = routing.locales.flatMap((locale) => ([
    {
      url: `${SITE_URL}/${locale}`,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/${locale}/modern`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/${locale}/historical`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]));

  return [rootEntry, ...localeEntries];
}

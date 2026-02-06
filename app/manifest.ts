import type { MetadataRoute } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME.en,
    short_name: 'NameGen',
    description: 'Best Chinese name generator for modern and historical Chinese names.',
    start_url: '/en',
    scope: '/',
    display: 'standalone',
    background_color: '#f7f4f4',
    theme_color: '#a43f67',
    categories: ['education', 'utilities', 'reference'],
    lang: 'en',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
    id: `${SITE_URL}/en`,
  };
}

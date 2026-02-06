import { routing } from '@/i18n/routing';
import type { LanguagePreference } from '@/types/preferences';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://chinese-name-gen.vercel.app';
export const PRIMARY_SEO_KEYWORD = 'best Chinese name generator';
export const SITE_OG_IMAGE = '/backgroud.png';

export const OG_LOCALE: Record<LanguagePreference, string> = {
  en: 'en_US',
  zh: 'zh_CN',
  ja: 'ja_JP',
  ko: 'ko_KR',
};

export const SITE_NAME: Record<LanguagePreference, string> = {
  en: 'Best Chinese Name Generator',
  zh: 'Best Chinese Name Generator',
  ja: 'Best Chinese Name Generator',
  ko: 'Best Chinese Name Generator',
};

export const SITE_DESCRIPTION: Record<LanguagePreference, string> = {
  en: 'Best Chinese name generator for modern and historical Chinese names with pinyin and cultural meaning.',
  zh: 'Best Chinese name generator for modern and historical Chinese names with pinyin and cultural meaning.',
  ja: 'Best Chinese name generator for modern and historical Chinese names with pinyin and cultural meaning.',
  ko: 'Best Chinese name generator for modern and historical Chinese names with pinyin and cultural meaning.',
};

const SHARED_KEYWORDS = [
  PRIMARY_SEO_KEYWORD,
  'Chinese name generator',
  'Chinese name meanings',
  'AI Chinese name generator',
  'modern Chinese names',
  'historical Chinese names',
  'Chinese names with pinyin',
  'Chinese naming tool',
];

export const SITE_KEYWORDS: Record<LanguagePreference, string[]> = {
  en: SHARED_KEYWORDS,
  zh: [...SHARED_KEYWORDS, 'chinese name generator zh'],
  ja: [...SHARED_KEYWORDS, 'chinese name generator ja'],
  ko: [...SHARED_KEYWORDS, 'chinese name generator ko'],
};

export const PAGE_TITLE: Record<'modern' | 'historical', Record<LanguagePreference, string>> = {
  modern: {
    en: 'Best Chinese Name Generator for Modern Names',
    zh: 'Modern Names | Best Chinese Name Generator',
    ja: 'Modern Names | Best Chinese Name Generator',
    ko: 'Modern Names | Best Chinese Name Generator',
  },
  historical: {
    en: 'Best Chinese Name Generator for Historical Names',
    zh: 'Historical Names | Best Chinese Name Generator',
    ja: 'Historical Names | Best Chinese Name Generator',
    ko: 'Historical Names | Best Chinese Name Generator',
  },
};

export const PAGE_DESCRIPTION: Record<'modern' | 'historical', Record<LanguagePreference, string>> = {
  modern: {
    en: 'Use the best Chinese name generator to create realistic modern Chinese names with pinyin and clear meanings.',
    zh: 'Use the best Chinese name generator to create realistic modern Chinese names with pinyin and clear meanings.',
    ja: 'Use the best Chinese name generator to create realistic modern Chinese names with pinyin and clear meanings.',
    ko: 'Use the best Chinese name generator to create realistic modern Chinese names with pinyin and clear meanings.',
  },
  historical: {
    en: 'Use the best Chinese name generator to explore historical Chinese figures and culturally grounded stories.',
    zh: 'Use the best Chinese name generator to explore historical Chinese figures and culturally grounded stories.',
    ja: 'Use the best Chinese name generator to explore historical Chinese figures and culturally grounded stories.',
    ko: 'Use the best Chinese name generator to explore historical Chinese figures and culturally grounded stories.',
  },
};

export const PAGE_KEYWORDS: Record<'modern' | 'historical', Record<LanguagePreference, string[]>> = {
  modern: {
    en: [...SHARED_KEYWORDS, 'modern Chinese name generator', 'Chinese baby name generator'],
    zh: [...SHARED_KEYWORDS, 'modern Chinese name generator'],
    ja: [...SHARED_KEYWORDS, 'modern Chinese name generator'],
    ko: [...SHARED_KEYWORDS, 'modern Chinese name generator'],
  },
  historical: {
    en: [...SHARED_KEYWORDS, 'historical Chinese names', 'Chinese dynasty names'],
    zh: [...SHARED_KEYWORDS, 'historical Chinese names'],
    ja: [...SHARED_KEYWORDS, 'historical Chinese names'],
    ko: [...SHARED_KEYWORDS, 'historical Chinese names'],
  },
};

export const toSafeLocale = (value: string): LanguagePreference => {
  return (routing.locales as readonly string[]).includes(value)
    ? (value as LanguagePreference)
    : routing.defaultLocale;
};

export const buildLanguageAlternates = (path: string): Record<LanguagePreference, string> => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const alternates = {} as Record<LanguagePreference, string>;
  routing.locales.forEach((locale) => {
    alternates[locale] = `/${locale}${normalizedPath === '/' ? '' : normalizedPath}`;
  });
  return alternates;
};

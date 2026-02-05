import { routing } from '@/i18n/routing';
import type { LanguagePreference } from '@/types/preferences';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://chinese-name-gen.vercel.app';

export const OG_LOCALE: Record<LanguagePreference, string> = {
  en: 'en_US',
  zh: 'zh_CN',
  ja: 'ja_JP',
  ko: 'ko_KR',
};

export const SITE_NAME: Record<LanguagePreference, string> = {
  en: 'Chinese Name Generator',
  zh: '中文名生成器',
  ja: '中国語名前ジェネレーター',
  ko: '중국어 이름 생성기',
};

export const SITE_DESCRIPTION: Record<LanguagePreference, string> = {
  en: 'Create meaningful, culturally accurate Chinese names with AI. Explore modern names and historical figures.',
  zh: '用 AI 生成自然、得体的中文名，并探索真实的历史人物与故事。',
  ja: 'AIで自然で意味のある中国語の名前を作成し、歴史上の人物も探索できます。',
  ko: 'AI로 자연스럽고 의미 있는 중국어 이름을 만들고, 역사 인물도 탐색하세요.',
};

export const PAGE_TITLE: Record<'modern' | 'historical', Record<LanguagePreference, string>> = {
  modern: {
    en: 'Modern Chinese Names',
    zh: '现代中文名',
    ja: '現代中国語の名前',
    ko: '현대 중국어 이름',
  },
  historical: {
    en: 'Historical Chinese Figures',
    zh: '历史人物',
    ja: '歴史上の人物',
    ko: '역사 인물',
  },
};

export const PAGE_DESCRIPTION: Record<'modern' | 'historical', Record<LanguagePreference, string>> = {
  modern: {
    en: 'Generate modern, natural-sounding Chinese names with pinyin and cultural explanations.',
    zh: '生成自然常见的现代中文名，包含拼音与文化解释。',
    ja: '現代的で自然な中国語の名前を、ピンインと解説付きで生成します。',
    ko: '현대적이고 자연스러운 중국어 이름을 병음과 설명과 함께 생성합니다.',
  },
  historical: {
    en: 'Explore real historical figures with short, culturally grounded backstories.',
    zh: '探索真实历史人物，并获得简短而有文化依据的故事介绍。',
    ja: '実在する歴史人物を選び、短い背景解説を提供します。',
    ko: '실존 역사 인물을 추천하고 짧은 배경 설명을 제공합니다.',
  },
};

export const toSafeLocale = (value: string): LanguagePreference => {
  return (routing.locales as readonly string[]).includes(value) ? (value as LanguagePreference) : routing.defaultLocale;
};

export const buildLanguageAlternates = (path: string): Record<LanguagePreference, string> => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const alternates = {} as Record<LanguagePreference, string>;
  routing.locales.forEach((locale) => {
    alternates[locale] = `/${locale}${normalizedPath === '/' ? '' : normalizedPath}`;
  });
  return alternates;
};

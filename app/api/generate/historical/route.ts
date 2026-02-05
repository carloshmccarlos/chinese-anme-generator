import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

import { generateHistoricalNamePrompt } from '@/lib/prompts/historical-name-prompt';
import { HISTORICAL_SYSTEM_PROMPT } from '@/lib/prompts/historical-system-prompt';
import { siliconFlow, SILICONFLOW_MODELS } from '@/lib/siliconflow';
import { historicalNameRequestSchema } from '@/lib/validators/historical-name';
import {
  normalizeTags,
  phoneticSimilarity,
} from '@/lib/historical-candidates';
import type { GenerateHistoricalNameRequest } from '@/types/api';
import type { GeneratedHistoricalName } from '@/types/name';
import type { LanguagePreference } from '@/types/preferences';
import type { ChatCompletionCreateParamsNonStreaming } from 'openai/resources/chat/completions/completions';

const VALID_DYNASTIES: GenerateHistoricalNameRequest['dynasty'][] = [
  'Shang-Zhou',
  'Qin-Han',
  'Three Kingdoms',
  'Wei-Jin Northern and Southern Dynasties',
  'Sui-Tang',
  'Five Dynasties and Ten Kingdoms',
  'Song',
  'Any',
];

const isDynasty = (value: unknown): value is GenerateHistoricalNameRequest['dynasty'] => {
  return typeof value === 'string' && (VALID_DYNASTIES as string[]).includes(value);
};

const countCjkChars = (value: string): number => {
  const matches = value.match(/[\u4E00-\u9FFF]/g);
  return matches ? matches.length : 0;
};

const hasNicknamePrefix = (value: string): boolean => {
  return /^[阿小老]/.test(value);
};

const normalizeString = (value: unknown): string => {
  return typeof value === 'string' ? value.trim() : '';
};

const HISTORICAL_TAG_FALLBACK: Record<LanguagePreference, string> = {
  en: 'Historical',
  zh: '历史',
  ja: '歴史',
  ko: '역사',
};

const DEFAULT_MATCH_REASON: Record<LanguagePreference, string> = {
  en: 'Matched by pronunciation similarity.',
  zh: '根据读音相似度匹配。',
  ja: '発音の類似性で一致しました。',
  ko: '발음 유사도로 매칭했습니다.',
};

const toGeneratedName = (
  params: GenerateHistoricalNameRequest,
  raw: Record<string, unknown>,
  minCjkChars: number,
  locale: LanguagePreference
): GeneratedHistoricalName | null => {
  const nameValue = normalizeString(raw.name);
  if (!nameValue) {
    return null;
  }

  if (hasNicknamePrefix(nameValue)) {
    return null;
  }

  const cjkCount = countCjkChars(nameValue);
  if (cjkCount < minCjkChars) {
    return null;
  }

  const pinyinValue = normalizeString(raw.pinyin);
  const dynastyValue = isDynasty(raw.dynasty)
    ? raw.dynasty
    : params.dynasty === 'Any'
      ? 'Song'
      : params.dynasty;

  const storyValue = (() => {
    if (typeof raw.story === 'string') {
      return raw.story.trim();
    }
    if (raw.story && typeof raw.story === 'object') {
      const storyObject = raw.story as Record<string, unknown>;
      return normalizeString(storyObject[locale])
        || normalizeString(storyObject.en)
        || normalizeString(storyObject.zh);
    }
    return '';
  })();

  const tags = normalizeTags(raw.tags, [params.style, HISTORICAL_TAG_FALLBACK[locale]]);

  const candidateText = pinyinValue || nameValue;
  const similarity = params.realName ? phoneticSimilarity(params.realName, candidateText) : 0;
  const matchScore = params.realName ? Math.round(similarity * 100) : 0;
  const matchReason = normalizeString(raw.matchReason)
    || (params.realName ? DEFAULT_MATCH_REASON[locale] : '');

  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    name: nameValue,
    pinyin: pinyinValue,
    dynasty: dynastyValue,
    story: storyValue,
    tags,
    gender: params.gender,
    style: params.style,
    matchReason,
    matchScore,
  };
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = historicalNameRequestSchema.parse(body);
    const depth = validatedData.explanationDepth ?? 'detailed';
    const locale = validatedData.locale ?? 'en';

    if (!process.env.SILICONFLOW_API_KEY && process.env.NODE_ENV !== 'production') {
      return NextResponse.json(
        { error: 'SILICONFLOW_API_KEY is not set' },
        { status: 500 }
      );
    }

    const completionRequest = {
      model: SILICONFLOW_MODELS.CHAT,
      messages: [
        { role: 'system', content: HISTORICAL_SYSTEM_PROMPT },
        { role: 'user', content: generateHistoricalNamePrompt(validatedData, depth, locale) },
      ],
      response_format: { type: 'json_object' },
      stream: false,
      temperature: 0.2,
      top_p: 0.8,
      top_k: 40,
      min_p: 0.05,
      frequency_penalty: 0.2,
      max_tokens: 2048,
    } as unknown as ChatCompletionCreateParamsNonStreaming;

    const response = await siliconFlow.chat.completions.create(completionRequest);

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('Empty response from LLM');
    }

    const parsed = JSON.parse(content) as Record<string, unknown>;
    const rawList = Array.isArray(parsed.names) ? parsed.names : [];
    const rawItems = rawList.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === 'object'));

    const strictMin = validatedData.length === 'double' ? 3 : 2;
    const strictNames = rawItems
      .map((raw) => toGeneratedName(validatedData, raw, strictMin, locale))
      .filter((item): item is GeneratedHistoricalName => Boolean(item));

    let selectedNames = strictNames;

    if (selectedNames.length < 3 && validatedData.length === 'double') {
      const relaxedNames = rawItems
        .map((raw) => toGeneratedName(validatedData, raw, 2, locale))
        .filter((item): item is GeneratedHistoricalName => Boolean(item));

      const byKey = new Map<string, GeneratedHistoricalName>();
      [...strictNames, ...relaxedNames].forEach((item) => {
        const key = `${item.name}-${item.pinyin}`;
        if (!byKey.has(key)) {
          byKey.set(key, item);
        }
      });
      selectedNames = Array.from(byKey.values());
    }

    const sortedNames = validatedData.realName
      ? [...selectedNames].sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))
      : selectedNames;

    if (!sortedNames.length) {
      throw new Error('Insufficient historical names returned');
    }

    return NextResponse.json({ names: sortedNames.slice(0, 3) });
  } catch (error: unknown) {
    console.error('Historical API Error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    const isZodError = error instanceof Error && error.name === 'ZodError';

    return NextResponse.json(
      { error: message },
      { status: isZodError ? 400 : 500 }
    );
  }
}

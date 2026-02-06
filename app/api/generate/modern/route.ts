import { NextResponse } from 'next/server';
import { detectSurnameType } from '@/lib/double-surnames';
import { generateModernNamePrompt } from '@/lib/prompts/modern-name-prompt';
import { SYSTEM_PROMPT } from '@/lib/prompts/system-prompt';
import { siliconFlow, SILICONFLOW_MODELS } from '@/lib/siliconflow';
import { modernNameRequestSchema } from '@/lib/validators/modern-name';
import type { ChatCompletionCreateParamsNonStreaming } from 'openai/resources/chat/completions/completions';

const countCjkChars = (value: string): number => {
  const matches = value.match(/[\u4E00-\u9FFF]/g);
  return matches ? matches.length : 0;
};

const toModernCandidate = (
  raw: Record<string, unknown>,
  params: ReturnType<typeof modernNameRequestSchema.parse>
): Record<string, unknown> | null => {
  const kanjiValue = typeof raw.kanji === 'string' ? raw.kanji.trim() : '';
  if (!kanjiValue) {
    return null;
  }

  const kanji = kanjiValue.replace(/\s+/g, '');

  if (params.wantedSurname && !kanji.startsWith(params.wantedSurname)) {
    return null;
  }

  const detectedSurnameType = detectSurnameType(kanji);
  if (detectedSurnameType === 'unknown') {
    return null;
  }

  if (params.surnameType && detectedSurnameType !== params.surnameType) {
    return null;
  }

  const surnameCharCount = detectedSurnameType === 'double' ? 2 : 1;
  const cjkCount = countCjkChars(kanji);
  const givenNameCount = cjkCount - surnameCharCount;
  if (givenNameCount < 1) {
    return null;
  }

  if (params.length === 'single' && givenNameCount !== 1) {
    return null;
  }

  if (params.length === 'double' && givenNameCount !== 2) {
    return null;
  }

  const rawStyle = typeof raw.style === 'string' ? raw.style.trim() : '';
  if (rawStyle.toLowerCase() !== params.style.toLowerCase()) {
    return null;
  }

  return {
    ...raw,
    kanji,
    style: params.style,
  };
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = modernNameRequestSchema.parse(body);
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
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: generateModernNamePrompt(validatedData, depth, locale) },
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

    const TARGET_COUNT = 3;
    const MAX_ATTEMPTS = 4;
    const byKanji = new Map<string, Record<string, unknown>>();

    for (let attempt = 0; attempt < MAX_ATTEMPTS && byKanji.size < TARGET_COUNT; attempt += 1) {
      const response = await siliconFlow.chat.completions.create(completionRequest);
      const content = response.choices[0].message.content;
      if (!content) {
        continue;
      }

      let data: Record<string, unknown>;
      try {
        data = JSON.parse(content) as Record<string, unknown>;
      } catch {
        continue;
      }

      const rawNames = Array.isArray(data.names)
        ? data.names.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === 'object'))
        : [];
      const candidates = rawNames
        .map((raw) => toModernCandidate(raw, validatedData))
        .filter((item): item is Record<string, unknown> => Boolean(item));

      candidates.forEach((name) => {
        const key = typeof name.kanji === 'string' ? name.kanji : '';
        if (key && !byKanji.has(key)) {
          byKanji.set(key, name);
        }
      });
    }

    if (byKanji.size < TARGET_COUNT) {
      return NextResponse.json(
        { error: `Could only generate ${byKanji.size} valid names after ${MAX_ATTEMPTS} attempts.` },
        { status: 422 }
      );
    }

    const namesWithIds = Array.from(byKanji.values())
      .slice(0, TARGET_COUNT)
      .map((name, index) => ({
        ...name,
        id: `${Date.now()}-${index}`,
      }));

    return NextResponse.json({ names: namesWithIds });
  } catch (error: unknown) {
    console.error('API Error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    const isZodError = error instanceof Error && error.name === 'ZodError';

    return NextResponse.json(
      { error: message },
      { status: isZodError ? 400 : 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { siliconFlow, SILICONFLOW_MODELS } from '@/lib/siliconflow';
import { modernNameRequestSchema } from '@/lib/validators/modern-name';
import { SYSTEM_PROMPT } from '@/lib/prompts/system-prompt';
import { generateModernNamePrompt } from '@/lib/prompts/modern-name-prompt';
import type { ChatCompletionCreateParamsNonStreaming } from 'openai/resources/chat/completions/completions';

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

    const response = await siliconFlow.chat.completions.create(completionRequest);

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('Empty response from LLM');
    }

    const data = JSON.parse(content);

    const namesWithIds = data.names.map((name: Record<string, unknown>, index: number) => ({
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

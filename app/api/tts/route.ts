import { NextResponse } from 'next/server';
import { ttsRequestSchema } from '@/lib/validators/tts';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, voice = 'fishaudio/fish-speech-1.5' } = ttsRequestSchema.parse(body);

    const response = await fetch('https://api.siliconflow.cn/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SILICONFLOW_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: voice,
        input: text,
        response_format: 'mp3',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || 'TTS API failed');
    }

    const audioBuffer = await response.arrayBuffer();
    
    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
  } catch (error: unknown) {
    console.error('TTS Error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    const isZodError = error instanceof Error && error.name === 'ZodError';
    return NextResponse.json({ error: message }, { status: isZodError ? 400 : 500 });
  }
}

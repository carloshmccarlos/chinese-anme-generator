import OpenAI from 'openai';

if (!process.env.SILICONFLOW_API_KEY) {
  console.warn('SILICONFLOW_API_KEY is not set');
}

export const siliconFlow = new OpenAI({
  apiKey: process.env.SILICONFLOW_API_KEY || '',
  baseURL: 'https://api.siliconflow.cn/v1',
});

// For TTS and other specific models if needed
export const SILICONFLOW_MODELS = {
  CHAT: 'Qwen/Qwen3-VL-235B-A22B-Instruct', // Default chat model
  TTS: 'fishaudio/fish-speech-1.5', // Example TTS model
} as const;

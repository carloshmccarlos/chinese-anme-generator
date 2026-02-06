import OpenAI from 'openai';

if (!process.env.SILICONFLOW_API_KEY) {
  console.warn('SILICONFLOW_API_KEY is not set');
}

export const siliconFlow = new OpenAI({
  apiKey: process.env.SILICONFLOW_API_KEY || '',
  baseURL: 'https://api.siliconflow.cn/v1',
});

export const SILICONFLOW_MODELS = {
  CHAT: 'deepseek-ai/DeepSeek-V3.2',
} as const;

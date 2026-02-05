import { z } from 'zod';

export const languageSchema = z.enum(['en', 'zh', 'ja', 'ko']);
export const explanationDepthSchema = z.enum(['brief', 'detailed']);

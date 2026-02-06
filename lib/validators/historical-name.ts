import { z } from 'zod';
import {
  explanationDepthSchema,
  languageSchema,
  surnameTypeSchema,
} from '@/lib/validators/common';

export const historicalNameRequestSchema = z.object({
  realName: z.string().optional(),
  gender: z.enum(['male', 'female']),
  dynasty: z.enum([
    'Shang-Zhou',
    'Qin-Han',
    'Three Kingdoms',
    'Wei-Jin Northern and Southern Dynasties',
    'Sui-Tang',
    'Five Dynasties and Ten Kingdoms',
    'Song',
    'Any',
  ]),
  style: z.string(),
  length: z.enum(['single', 'double', 'any']),
  surnameType: surnameTypeSchema.optional(),
  locale: languageSchema.optional(),
  explanationDepth: explanationDepthSchema.optional(),
});

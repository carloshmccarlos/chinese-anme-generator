import { z } from 'zod';
import { explanationDepthSchema, languageSchema } from '@/lib/validators/common';

export const modernNameRequestSchema = z.object({
  realName: z.string().optional(),
  gender: z.enum(['male', 'female']),
  style: z.string(),
  themes: z.array(z.string()),
  length: z.enum(['single', 'double', 'any']),
  includeSurname: z.boolean(),
  surname: z.string().optional(),
  locale: languageSchema.optional(),
  explanationDepth: explanationDepthSchema.optional(),
});

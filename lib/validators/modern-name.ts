import { z } from 'zod';
import {
  explanationDepthSchema,
  languageSchema,
  surnameTypeSchema,
  validateSurnamePreference,
  wantedSurnameSchema,
} from '@/lib/validators/common';

export const modernNameRequestSchema = z.object({
  realName: z.string().optional(),
  gender: z.enum(['male', 'female']),
  style: z.string(),
  themes: z.array(z.string()),
  length: z.enum(['single', 'double', 'any']),
  surnameType: surnameTypeSchema.optional(),
  wantedSurname: wantedSurnameSchema,
  locale: languageSchema.optional(),
  explanationDepth: explanationDepthSchema.optional(),
}).superRefine((data, ctx) => {
  validateSurnamePreference(data, ctx);
});

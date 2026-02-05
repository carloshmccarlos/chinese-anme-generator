import { z } from 'zod';

export const ttsRequestSchema = z.object({
  text: z.string().min(1, 'Text is required'),
  voice: z.string().optional(),
});

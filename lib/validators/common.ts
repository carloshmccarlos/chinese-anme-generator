import { z } from 'zod';

export const languageSchema = z.enum(['en', 'zh', 'ja', 'ko']);
export const explanationDepthSchema = z.enum(['brief', 'detailed']);
export const surnameTypeSchema = z.enum(['single', 'double']);

export const wantedSurnameSchema = z.string().trim().optional();

interface SurnamePreference {
  surnameType?: z.infer<typeof surnameTypeSchema>;
  wantedSurname?: string;
}

const CHINESE_CHARACTERS_REGEX = /^[\u3400-\u9FFF]+$/;

export function validateSurnamePreference(
  data: SurnamePreference,
  ctx: z.RefinementCtx
): void {
  if (!data.wantedSurname) {
    return;
  }

  if (!CHINESE_CHARACTERS_REGEX.test(data.wantedSurname)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['wantedSurname'],
      message: 'Wanted surname must contain only Chinese characters.',
    });
    return;
  }

  const surnameLength = Array.from(data.wantedSurname).length;

  if (data.surnameType === 'single' && surnameLength !== 1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['wantedSurname'],
      message: 'Single-character surname must be exactly 1 Chinese character.',
    });
    return;
  }

  if (data.surnameType === 'double' && surnameLength !== 2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['wantedSurname'],
      message: 'Double-character surname must be exactly 2 Chinese characters.',
    });
    return;
  }

  if (!data.surnameType && surnameLength > 2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['wantedSurname'],
      message: 'Wanted surname can be at most 2 Chinese characters.',
    });
  }
}

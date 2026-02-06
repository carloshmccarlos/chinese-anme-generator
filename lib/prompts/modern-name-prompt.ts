import type { GenerateModernNameRequest } from '@/types/api';
import type { LanguagePreference } from '@/types/preferences';

const OUTPUT_LANGUAGE: Record<LanguagePreference, string> = {
  en: 'English',
  zh: 'Simplified Chinese (简体中文)',
  ja: 'Japanese (日本語)',
  ko: 'Korean (한국어)',
};

const STYLE_STRICT_RULES: Record<string, string> = {
  Elegant: 'Must feel refined, graceful, and understated; avoid aggressive or rugged tone.',
  Powerful: 'Must feel strong, resolute, and commanding; avoid soft or overly delicate tone.',
  Literary: 'Must feel scholarly, cultured, and poetic; avoid slangy or internet-style naming.',
  Modern: 'Must feel contemporary, practical, and clean; avoid archaic or classical dramatization.',
};

const getSurnameInstruction = (params: GenerateModernNameRequest): string => {
  if (params.wantedSurname && params.surnameType === 'single') {
    return `Use this surname exactly: ${params.wantedSurname}. It is a single-character surname.`;
  }

  if (params.wantedSurname && params.surnameType === 'double') {
    return `Use this surname exactly: ${params.wantedSurname}. It is a double-character surname.`;
  }

  if (params.wantedSurname) {
    return `Use this surname exactly: ${params.wantedSurname}.`;
  }

  if (params.surnameType === 'single') {
    return 'Choose a common single-character Chinese surname (for example: 王, 李, 张, 陈, 刘, 杨, 黄, 赵, 吴, 周).';
  }

  if (params.surnameType === 'double') {
    return 'Choose a real double-character Chinese surname (for example: 欧阳, 司马, 上官, 诸葛, 夏侯).';
  }

  return 'Choose a common modern Chinese surname (single-character is preferred unless clearly justified).';
};

export const generateModernNamePrompt = (
  params: GenerateModernNameRequest,
  depth: 'brief' | 'detailed',
  locale: LanguagePreference
): string => {
  const surnameInstruction = getSurnameInstruction(params);
  const styleRule = STYLE_STRICT_RULES[params.style] ?? 'Must clearly match the requested style.';
  const themes = params.themes?.length ? params.themes.join(', ') : 'none';

  return `Generate exactly 3 unique modern Chinese full names (surname + given name) for a ${params.gender} person.

Hard constraints:
- Each result MUST be a full name: "kanji" must include both surname and given name.
- ${surnameInstruction}
- If surname type is "single", surname must be exactly 1 Chinese character.
- If surname type is "double", surname must be exactly 2 Chinese characters.
- Given name length preference: ${params.length}
- Style: ${params.style}
- Strict style rule: ${styleRule}
- Any candidate that does not clearly match the requested style is invalid and must not be returned.
- Themes to reflect (subtly, not forced): ${themes}
- Names must sound like realistic present-day Chinese names used in real life.
- Avoid fantasy, wuxia/xianxia, ancient-court, or novel-character naming vibes.
- Do NOT use rare/obscure characters; prefer commonly used modern naming characters.
- Avoid negative meanings, tragic connotations, vulgar/violent words, or taboo associations.
- Avoid characters that are difficult to write or ambiguous in pronunciation.
- Ensure the three names are distinct: do not reuse the same given-name characters across results.
- Output language: ${OUTPUT_LANGUAGE[locale]}. Write ALL narrative fields ("meaning", "etymology", "tags") in this language only.

Personal context:
${params.realName ? `- The user's real name is: ${params.realName} (optional reference: align vibe/sound naturally, do not force transliteration).` : '- (none provided)'}

Explanation depth: ${depth}

For each name:
- "pinyin" must include tone marks.
- "meaning" should be a natural, fluent introduction (not only character-by-character glosses). ${depth === 'brief'
    ? 'Keep to 1 sentence.'
    : 'Use 2-3 sentences.'
  }
- "etymology" should explain why the surname and given-name characters fit the requested style and themes. ${depth === 'brief'
    ? 'Keep to about 2-3 sentences.'
    : 'Use about 4-6 sentences with clear linguistic and cultural reasoning.'
  }
- "style" must be exactly "${params.style}".
- "tags" should be 2-3 short keywords.

Return a JSON object with this exact shape:
{
  "names": [
    {
      "kanji": "Chinese characters (surname+given name)",
      "pinyin": "Pinyin with tone marks",
      "meaning": "Localized meaning/introduction",
      "etymology": "Explanation",
      "tags": ["tag1", "tag2"],
      "gender": "${params.gender}",
      "style": "${params.style}"
    }
  ]
}`;
};

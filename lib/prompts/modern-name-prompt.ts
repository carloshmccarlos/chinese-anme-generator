import type { GenerateModernNameRequest } from '@/types/api';
import type { LanguagePreference } from '@/types/preferences';

const OUTPUT_LANGUAGE: Record<LanguagePreference, string> = {
  en: 'English',
  zh: 'Simplified Chinese (简体中文)',
  ja: 'Japanese (日本語)',
  ko: 'Korean (한국어)',
};

export const generateModernNamePrompt = (
  params: GenerateModernNameRequest,
  depth: 'brief' | 'detailed',
  locale: LanguagePreference
): string => {
  const surnameInstruction = params.surname
    ? `Use this surname exactly: ${params.surname}.`
    : 'Choose a common modern Chinese surname (e.g., 王, 李, 张, 陈, 刘, 杨, 黄, 赵, 吴, 周).';

  const themes = params.themes?.length ? params.themes.join(', ') : 'none';

  return `Generate exactly 3 unique modern Chinese full names (surname + given name) for a ${params.gender} person.

Hard constraints:
- Each result MUST be a full name: "kanji" must include both surname and given name.
- ${surnameInstruction}
- Given name length preference: ${params.length}
- Style: ${params.style}
- Themes to reflect (subtly, not forced): ${themes}
- Do NOT use rare/obscure characters; prefer commonly used modern naming characters.
- Avoid negative meanings, tragic connotations, vulgar/violent words, or unlucky/taboo associations.
- Avoid characters that are hard to write or ambiguous in pronunciation.
- Ensure the three names are distinct: do not reuse the same given-name characters across results.
- Output language: ${OUTPUT_LANGUAGE[locale]}. Write ALL narrative fields ("meaning", "etymology", "tags") in this language only.

Personal context:
${params.realName ? `- The user's real name is: ${params.realName} (optional: you may aim for a similar vibe or sound, but do not force it).` : '- (none provided)'}

Explanation depth: ${depth}

For each name:
- "pinyin" must include tone marks.
- "meaning" should be a natural, fluent introduction (not word-by-word only). ${depth === 'brief'
    ? 'Keep to 1 sentence.'
    : 'Use 2–3 sentences.'
  }
- "etymology" should explain why the surname and each given-name character fits the style + themes. ${depth === 'brief'
    ? 'Keep to ~2–3 sentences.'
    : 'Use ~5–8 sentences with clear reasoning and character nuance.'
  }
- "tags" should be 2–4 short keywords.

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

import type { GenerateHistoricalNameRequest } from '@/types/api';
import type { LanguagePreference } from '@/types/preferences';

const OUTPUT_LANGUAGE: Record<LanguagePreference, string> = {
  en: 'English',
  zh: 'Simplified Chinese (简体中文)',
  ja: 'Japanese (日本語)',
  ko: 'Korean (한국어)',
};

const DYNASTY_LABEL: Record<GenerateHistoricalNameRequest['dynasty'], string> = {
  'Shang-Zhou': 'Shang-Zhou',
  'Qin-Han': 'Qin-Han',
  'Three Kingdoms': 'Three Kingdoms',
  'Wei-Jin Northern and Southern Dynasties': 'Wei-Jin / Northern & Southern Dynasties',
  'Sui-Tang': 'Tang',
  'Five Dynasties and Ten Kingdoms': 'Five Dynasties and Ten Kingdoms',
  Song: 'Song',
  Any: 'Any (Shang/Zhou through Song)',
};

const LENGTH_LABEL: Record<GenerateHistoricalNameRequest['length'], string> = {
  single: 'One character',
  double: 'Two characters',
  any: 'Any',
};

export const generateHistoricalNamePrompt = (
  params: GenerateHistoricalNameRequest,
  depth: 'brief' | 'detailed',
  locale: LanguagePreference
): string => {
  return `Generate Chinese historical name recommendations using your own knowledge.

User preferences:
- Gender: ${params.gender}
- Dynasty: ${DYNASTY_LABEL[params.dynasty]}
- Style: ${params.style}
- Given name length preference: ${LENGTH_LABEL[params.length]}
${params.realName ? `- Personal context: The user's real name is "${params.realName}"` : ''}

Primary objective:
- Select EXACTLY THREE real historical figures.
${params.realName ? `- Rank them by pronunciation similarity to the user's real name.` : ''}
${params.realName ? `- Use the Chinese name pronunciation (pinyin with tone marks) to judge similarity.` : ''}

Constraints:
- Do NOT invent or fictionalize any person.
- Prefer scholars, poets, philosophers, and respected officials.
- Avoid villains, criminals, tyrants, eunuchs, or oppressive historical roles.
- Ensure all historical facts are accurate.
- Select ONLY real historical figures. If uncertain about a fact, choose a different figure rather than guessing.
- Use the full formal historical name (surname + given name). Do NOT use nicknames, courtesy names only, or diminutives.
- If a dynasty match is not exact, choose the closest appropriate dynasty and state it.
- If pinyin is unknown, leave it as an empty string.
- Output language: ${OUTPUT_LANGUAGE[locale]}. Write ALL narrative fields ("story", "tags", "matchReason") in this language only.
- Story length: ${depth === 'brief' ? '1–2 sentences' : '3–4 sentences'}.
- Output rules (STRICT): Output VALID JSON ONLY. Do NOT use markdown. Do NOT add commentary outside JSON.
- Use the exact schema below. Do NOT add extra keys. Select EXACTLY THREE names.
${params.length === 'double' ? '- Given name length preference is two characters: avoid figures whose given name is only one character when possible.' : ''}

Return a JSON object with this EXACT structure:

{
  "names": [
    {
      "name": "",
      "pinyin": "",
      "dynasty": "",
      "story": "",
      "tags": [],
      "matchScore": 0,
      "matchReason": ""
    }
  ]
}`;
};

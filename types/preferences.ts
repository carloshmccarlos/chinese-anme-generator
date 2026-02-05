export type LanguagePreference = 'en' | 'zh' | 'ja' | 'ko';
export type ExplanationDepth = 'brief' | 'detailed';

export interface UserPreferences {
  language: LanguagePreference;
  explanationDepth: ExplanationDepth;
  lastUsedMode: 'modern' | 'historical';
}

import type { ModernName, GeneratedHistoricalName } from './name';
import type { ExplanationDepth, LanguagePreference } from './preferences';

export type SurnameType = 'single' | 'double';

export interface GenerateModernNameRequest {
  realName?: string;
  gender: 'male' | 'female';
  style: string;
  themes: string[];
  length: 'single' | 'double' | 'any';
  surnameType?: SurnameType;
  wantedSurname?: string;
  locale?: LanguagePreference;
  explanationDepth?: ExplanationDepth;
}

export interface GenerateModernNameResponse {
  names: ModernName[];
}

export interface GenerateHistoricalNameRequest {
  realName?: string;
  gender: 'male' | 'female';
  dynasty: 'Shang-Zhou'
    | 'Qin-Han'
    | 'Three Kingdoms'
    | 'Wei-Jin Northern and Southern Dynasties'
    | 'Sui-Tang'
    | 'Five Dynasties and Ten Kingdoms'
    | 'Song'
    | 'Any';
  style: string;
  length: 'single' | 'double' | 'any';
  surnameType?: SurnameType;
  locale?: LanguagePreference;
  explanationDepth?: ExplanationDepth;
}

export interface GenerateHistoricalNameResponse {
  names: GeneratedHistoricalName[];
}

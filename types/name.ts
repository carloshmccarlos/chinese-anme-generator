export interface ModernName {
  id: string;
  kanji: string;
  pinyin: string;
  meaning: string;
  etymology: string;
  tags: string[];
  gender: 'male' | 'female';
  style: string;
}

export interface HistoricalName {
  id: string;
  name: string;
  pinyin: string;
  dynasty: string;
  archetype: string;
  biography: {
    en: string;
    zh: string;
  };
  achievements: string[];
  popularity: number;
}

export interface GeneratedHistoricalName {
  id: string;
  name: string;
  pinyin: string;
  dynasty: string;
  story: string;
  tags: string[];
  gender: 'male' | 'female';
  style: string;
  matchReason?: string;
  matchScore?: number;
}

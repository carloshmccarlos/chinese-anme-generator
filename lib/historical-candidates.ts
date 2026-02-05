import type { GenerateHistoricalNameRequest } from '@/types/api';

const normalizePhonetic = (value: string): string => {
  return value.toLowerCase().replace(/[^a-z]/g, '');
};

const bigramScore = (a: string, b: string): number => {
  if (!a || !b) {
    return 0;
  }
  const aBigrams = new Set<string>();
  for (let i = 0; i < a.length - 1; i += 1) {
    aBigrams.add(a.slice(i, i + 2));
  }
  const bBigrams = new Set<string>();
  for (let i = 0; i < b.length - 1; i += 1) {
    bBigrams.add(b.slice(i, i + 2));
  }
  let overlap = 0;
  aBigrams.forEach((bigram) => {
    if (bBigrams.has(bigram)) {
      overlap += 1;
    }
  });
  return (2 * overlap) / (aBigrams.size + bBigrams.size);
};

export const phoneticSimilarity = (realName: string | undefined, candidateText: string | undefined): number => {
  if (!realName) {
    return 0;
  }
  const real = normalizePhonetic(realName);
  if (!real) {
    return 0;
  }
  const normalizedCandidate = normalizePhonetic(candidateText ?? '');
  return bigramScore(real, normalizedCandidate);
};

export const normalizeTags = (tags: unknown, fallback: string[]): string[] => {
  if (Array.isArray(tags)) {
    const filtered = tags.filter((tag): tag is string => (
      typeof tag === 'string' && tag.trim().length > 0
    ));
    if (filtered.length > 0) {
      return filtered.slice(0, 6);
    }
  }
  return fallback;
};

export const inferDynastyGroup = (text: string): GenerateHistoricalNameRequest['dynasty'] | undefined => {
  const lower = text.toLowerCase();
  if (lower.includes('shang dynasty') || lower.includes('zhou dynasty')) {
    return 'Shang-Zhou';
  }
  if (lower.includes('qin dynasty') || lower.includes('han dynasty')) {
    return 'Qin-Han';
  }
  if (lower.includes('three kingdoms')) {
    return 'Three Kingdoms';
  }
  if (
    lower.includes('jin dynasty')
    || lower.includes('northern and southern dynasties')
    || lower.includes('northern wei')
    || lower.includes('liu song dynasty')
    || lower.includes('liang dynasty')
    || lower.includes('northern zhou')
    || lower.includes('eastern wei')
    || lower.includes('western wei')
  ) {
    return 'Wei-Jin Northern and Southern Dynasties';
  }
  if (lower.includes('sui dynasty') || lower.includes('tang dynasty')) {
    return 'Sui-Tang';
  }
  if (
    lower.includes('five dynasties and ten kingdoms')
    || lower.includes('five dynasties')
    || lower.includes('ten kingdoms')
  ) {
    return 'Five Dynasties and Ten Kingdoms';
  }
  if (lower.includes('song dynasty')) {
    return 'Song';
  }
  return undefined;
};

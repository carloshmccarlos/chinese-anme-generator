import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserPreferences, LanguagePreference, ExplanationDepth } from '@/types/preferences';

interface PreferencesState extends UserPreferences {
  setLanguage: (lang: LanguagePreference) => void;
  setExplanationDepth: (depth: ExplanationDepth) => void;
  setLastUsedMode: (mode: 'modern' | 'historical') => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      language: 'en',
      explanationDepth: 'detailed',
      lastUsedMode: 'modern',
      setLanguage: (language) => set({ language }),
      setExplanationDepth: (explanationDepth) => set({ explanationDepth }),
      setLastUsedMode: (lastUsedMode) => set({ lastUsedMode }),
    }),
    {
      name: 'user-preferences',
    }
  )
);

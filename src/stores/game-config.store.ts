import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TGameConfigStore = {
  gameSpeed: 'slow' | 'medium' | 'fast';
  setGameSpeed: (gameSpeed: 'slow' | 'medium' | 'fast') => void;
  showUsedWords: boolean;
  setShowUsedWords: (showUsedWords: boolean) => void;
  showHowManyWordsLeft: boolean;
  setShowHowManyWordsLeft: (showHowManyWordsLeft: boolean) => void;
  hasTimer: boolean;
  setHasTimer: (hasTimer: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (soundEnabled: boolean) => void;
};

export const useGameConfigStore = create<TGameConfigStore>()(
  persist(
    (set) => ({
      gameSpeed: 'medium',
      setGameSpeed: (gameSpeed: 'slow' | 'medium' | 'fast') => set({ gameSpeed }),
      showUsedWords: true,
      setShowUsedWords: (showUsedWords: boolean) => set({ showUsedWords }),
      showHowManyWordsLeft: true,
      setShowHowManyWordsLeft: (showHowManyWordsLeft: boolean) => set({ showHowManyWordsLeft }),
      hasTimer: true,
      setHasTimer: (hasTimer: boolean) => set({ hasTimer }),
      soundEnabled: true,
      setSoundEnabled: (soundEnabled: boolean) => set({ soundEnabled }),
    }),
    { name: 'game-config' }
  )
);

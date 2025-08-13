import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Pack } from '../data/types';

export type TGamePackStore = {
  packName: string;
  packLanguage: string;
  pack: Pack | null;
  setPackName: (packName: string) => void;
  setPackLanguage: (packLanguage: string) => void;
  setPack: (pack: Pack | null) => void;
};

export const useGamePackStore = create<TGamePackStore>()(
  persist(
    (set) => ({
      packName: '',
      packLanguage: '',
      pack: null,
      setPackName: (packName: string) => set({ packName }),
      setPackLanguage: (packLanguage: string) => set({ packLanguage }),
      setPack: (pack: Pack | null) => set({ pack }),
    }),
    { name: 'game-pack' }
  )
);

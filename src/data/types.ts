import type { LanguageCode } from './languages';

export type Words = {
  [key in LanguageCode]?: Word[];
};

export type Pack = {
  name: string;
  description?: string;
  category: string[];
  words: Words;
};

export type Word = {
  main: string;
  regexes?: RegExp[]; // Optional for backward compatibility
  aliases?: string[]; // Optional aliases for fuzzy search
};

export type GameData = {
  packs: Pack[];
};

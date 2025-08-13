// helper functions for the data

import { data } from '.';
import type { LanguageCode } from './languages';
import type { Pack } from './types';

type GetPacksOptions = {
  language?: LanguageCode;
  category?: string;
};

type GetWordsOptions = {
  language?: LanguageCode;
};

export class Packs {
  static packs = data.packs;

  static getPacks(options?: GetPacksOptions) {
    return Packs.packs.filter((p) => {
      if (options?.language && !p.words[options.language]) return false;
      if (options?.category && !p.category.includes(options.category)) return false;

      return true;
    });
  }

  static getWords(pack: Pack, options?: GetWordsOptions) {
    const words = pack.words[options?.language ?? 'en'];

    if (!words) {
      throw new Error(`Pack ${pack.name} does not have a word list for language ${options?.language}`);
    }

    return words;
  }
}

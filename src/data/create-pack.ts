import type { LanguageCode } from './languages';
import type { Pack, Word, Words } from './types';

type WordsInput =
  | {
      [key in LanguageCode]?: Array<Word | string | Pick<Word, 'main'>>;
    }
  | Array<Word | string | Pick<Word, 'main'>>;

export function createPack(
  name: string,
  words: WordsInput,
  options?: Partial<Pick<Pack, 'description' | 'category'>> & { defaultLanguage?: LanguageCode }
): Pack {
  const normalizedWords = normalizeWords(words, options?.defaultLanguage ?? 'en');

  return {
    name,
    description: options?.description || 'No description provided',
    category: options?.category || [],
    words: normalizedWords,
  };
}

function normalizeWords(words: WordsInput, defaultLanguage: LanguageCode): Words {
  if (Array.isArray(words)) {
    return { [defaultLanguage]: mapToWordArray(words) };
  }

  const result: Words = {};
  for (const [language, items] of Object.entries(words)) {
    if (!items) continue;
    result[language as LanguageCode] = mapToWordArray(items as Array<Word | string | Pick<Word, 'main'>>);
  }
  return result;
}

function mapToWordArray(items: Array<Word | string | Pick<Word, 'main'>>): Word[] {
  return items.map(toWord);
}

function toWord(item: Word | string | Pick<Word, 'main'>): Word {
  const base =
    typeof item === 'string'
      ? { main: item, regexes: [] as RegExp[] }
      : 'regexes' in item
        ? { main: item.main, regexes: item.regexes ?? [] }
        : { main: item.main, regexes: [] as RegExp[] };

  const selfRegex = createSelfRegex(base.main);
  const merged = Array.isArray(base.regexes) ? [...base.regexes] : [];
  if (!merged.some((r) => r.source === selfRegex.source && r.flags === selfRegex.flags)) {
    merged.push(selfRegex);
  }

  return { main: base.main, regexes: merged };
}

function createSelfRegex(main: string): RegExp {
  return new RegExp(escapeRegExp(main), 'i');
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

import Fuse from 'fuse.js';

export interface WordItem {
  main: string;
  aliases?: string[];
  regexes?: RegExp[];
}

export interface FuzzySearchResult {
  word: string;
  score: number;
  isExactMatch: boolean;
}

// Configure Fuse.js for word matching
const fuseOptions = {
  // Search in the main word and aliases
  keys: ['main', 'aliases'],

  // Threshold for matching (0.0 = perfect match, 1.0 = very loose)
  threshold: 0.3,

  // Include score in results
  includeScore: true,

  // Ignore case
  ignoreCase: true,

  // Ignore location (don't penalize matches at the end of strings)
  ignoreLocation: true,

  // Use simple distance calculation for better performance
  distance: 100,

  // Minimum character length for matching
  minMatchCharLength: 2,
};

export function createFuzzySearcher(words: WordItem[]) {
  return new Fuse(words, fuseOptions);
}

export function findBestMatch(input: string, words: WordItem[], currentLetter: string): FuzzySearchResult | null {
  // First, filter words that start with the current letter (case-insensitive)
  const wordsStartingWithLetter = words.filter((word) =>
    word.main.toLowerCase().startsWith(currentLetter.toLowerCase())
  );

  if (wordsStartingWithLetter.length === 0) {
    return null;
  }

  // Create Fuse instance for the filtered words
  const fuse = createFuzzySearcher(wordsStartingWithLetter);

  // Search for the input
  const results = fuse.search(input);

  if (results.length === 0) {
    return null;
  }

  // Get the best match
  const bestMatch = results[0];
  const score = bestMatch.score || 1;

  // Check if it's an exact match (case-insensitive)
  const isExactMatch = bestMatch.item.main.toLowerCase() === input.toLowerCase();

  // If the score is too high (worse match), return null
  if (score > 0.4) {
    return null;
  }

  return {
    word: bestMatch.item.main,
    score,
    isExactMatch,
  };
}

// Helper function to check if a word is already used
export function isWordUsed(word: string, usedWords: string[]): boolean {
  return usedWords.some((usedWord) => usedWord.toLowerCase() === word.toLowerCase());
}

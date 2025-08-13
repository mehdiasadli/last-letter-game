import { findBestMatch, isWordUsed } from './fuzzy-search';

export function checkWord(
  input: string,
  currentLetter: string,
  packWords: { main: string; regexes?: RegExp[] }[],
  usedWords: string[]
) {
  const word = input.trim();

  if (!word) {
    return { error: 'Word cannot be empty' };
  }

  if (!word.toLowerCase().startsWith(currentLetter.toLowerCase())) {
    return { error: 'Word does not start with the current letter' };
  }

  // Use fuzzy search to find the best match
  const match = findBestMatch(word, packWords, currentLetter);

  if (!match) {
    return { error: 'Word not found in pack' };
  }

  // Check if the word is already used
  if (isWordUsed(match.word, usedWords)) {
    return { error: 'Word already used' };
  }

  return { word: match.word };
}

export type GameSpeed = 'slow' | 'medium' | 'fast';
export type StartTimeConfig = {
  baseBySpeed: Record<GameSpeed, number>;
  bonusAtLowWords: number;
  remainingHalf: number;
  roundPenaltyPerRound: number;
  roundPenaltyCap: number;
  minSeconds: number;
};

const defaultStartTimeConfig: StartTimeConfig = {
  baseBySpeed: { slow: 90, medium: 60, fast: 45 },
  bonusAtLowWords: 45,
  remainingHalf: 20,
  roundPenaltyPerRound: 2,
  roundPenaltyCap: 10,
  minSeconds: 15,
};

export function getStartSeconds(
  params: { remainingWords: number; round: number; speed: GameSpeed },
  cfg: Partial<StartTimeConfig> = {}
) {
  return 5;

  const c: StartTimeConfig = { ...defaultStartTimeConfig, ...cfg };
  const remaining = Math.max(0, Math.floor(params.remainingWords));
  const round = Math.max(1, Math.floor(params.round));
  const base = c.baseBySpeed[params.speed];

  const bonus = c.bonusAtLowWords * (c.remainingHalf / (remaining + c.remainingHalf));

  const roundsBeyondFirst = Math.max(0, round - 1);
  const penaltyRounds = Math.min(roundsBeyondFirst, c.roundPenaltyCap);
  const penalty = penaltyRounds * c.roundPenaltyPerRound;

  return Math.max(c.minSeconds, Math.round(base + bonus - penalty));
}

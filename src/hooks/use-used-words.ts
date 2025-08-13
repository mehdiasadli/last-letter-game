import { useGameStore } from '../stores/game.store';
import { useWords } from './use-words';

export function useUsedWords() {
  const { usedWords, currentLetter } = useGameStore();
  const words = useWords();

  return {
    get usedWordsWithCurrentLetter() {
      return words.filter(
        (w) => w.main.toLowerCase().startsWith(currentLetter.toLowerCase()) && !usedWords.includes(w.main)
      );
    },
  };
}

import { useGameStore } from '../stores/game.store';

export function useHandleSubmit() {
  const { currentPlayer, currentRound, currentLetter, usedWords, setWord: useWord } = useGameStore();

  const handleSubmit = (word: string) => {};
}

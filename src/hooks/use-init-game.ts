import { useEffect } from 'react';
import { useGameStore } from '../stores/game.store';
import { usePlayersStore } from '../stores/players.store';
import { useWords } from './use-words';

export function useInitGame() {
  const { currentRound, currentPlayer, currentLetter, setCurrentPlayer, setCurrentLetter } = useGameStore();
  const { players } = usePlayersStore();
  const words = useWords();

  useEffect(() => {
    if (currentRound === 1 && !currentPlayer) {
      setCurrentPlayer(players[0].name);
    }
  }, [currentRound, currentPlayer, players, setCurrentPlayer]);

  useEffect(() => {
    if (currentRound === 1 && !currentLetter) {
      // Get all possible starting letters from available words
      const availableLetters = [...new Set(words.map((word) => word.main[0].toUpperCase()))];

      if (availableLetters.length > 0) {
        // Pick a random letter
        const randomLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)];
        setCurrentLetter(randomLetter);
      } else {
        // Fallback to 'A' if no words available
        setCurrentLetter('A');
      }
    }
  }, [currentRound, currentLetter, setCurrentLetter, words]);
}

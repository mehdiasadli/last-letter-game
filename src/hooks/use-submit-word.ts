import { toast } from 'sonner';
import { useGameStore } from '../stores/game.store';
import { checkWord, getStartSeconds } from '../lib/utils';
import { useWords } from './use-words';
import { usePlayersStore } from '../stores/players.store';
import { useGameConfigStore } from '../stores/game-config.store';
import { useNavigate } from 'react-router-dom';
import { createErrorSound } from '../lib/sounds';

type SubmitWordProps = {
  timeStatus: 'active' | 'paused' | 'ended';
  restart: (seconds?: number) => void;
  field: ReturnType<typeof import('./use-word-field').useWordField>;
};

export function useSubmitWord(props: SubmitWordProps) {
  const { currentRound, currentLetter, currentPlayer, usedWords, setWord, nextTurn, endGame, setPulsingWord } =
    useGameStore();
  const words = useWords();
  const { gameSpeed, soundEnabled } = useGameConfigStore();
  const { players } = usePlayersStore();
  const navigate = useNavigate();

  const onSubmit = (word: string) => {
    if (props.timeStatus !== 'active') {
      toast.error('Time is not running right now', {
        position: 'top-center',
        richColors: true,
        duration: 1500,
      });
      return;
    }

    const { error, word: correctWord } = checkWord(word, currentLetter, words, usedWords);

    if (error || !correctWord) {
      // Play error sound for any validation error
      if (soundEnabled) {
        createErrorSound();
      }

      toast.error(error || 'Invalid word', {
        position: 'top-center',
        richColors: true,
        duration: 2000,
      });

      // If the word is already used, trigger pulse animation
      // Use case-insensitive comparison to find the matching word in usedWords
      const matchingUsedWord = usedWords.find((usedWord) => usedWord.toLowerCase() === word.toLowerCase());

      if (matchingUsedWord) {
        setPulsingWord(matchingUsedWord); // Use the exact word from usedWords
        // Clear the pulse after animation duration (1.2 seconds for two pulses)
        setTimeout(() => setPulsingWord(null), 1200);
      }

      // Don't clear the field on error - let user correct it
      return;
    }

    setWord(correctWord);
    props.field.reset();

    const nextAvailableWords = words
      .filter((w) => !usedWords.includes(w.main) && w.main !== correctWord)
      .map((w) => w.main);

    // Check if this was a winning move (single player scenario)
    const alivePlayers = players.filter((p) => !p.eliminated);
    if (alivePlayers.length === 1) {
      // Single player found a word - they win!
      endGame(currentPlayer);
      toast.success(`${currentPlayer} wins the game!`, {
        position: 'top-center',
        richColors: true,
        duration: 3000,
      });
      navigate('/result');
      return;
    }

    // Check if this was the last word in the pack (multiple winners scenario)
    const remainingWords = words.filter((w) => !usedWords.includes(w.main) && w.main !== correctWord);
    if (remainingWords.length === 0) {
      // No more words available - all remaining players are winners
      const winners = alivePlayers.map((p) => p.name);
      endGame(undefined, winners);
      toast.success(`Game Over! ${winners.join(', ')} win!`, {
        position: 'top-center',
        richColors: true,
        duration: 3000,
      });
      navigate('/result');
      return;
    }

    nextTurn({
      players,
      lastWord: correctWord,
      availableWords: nextAvailableWords,
    });

    props.restart(
      getStartSeconds({ remainingWords: nextAvailableWords.length, round: currentRound, speed: gameSpeed })
    );
  };

  return {
    onSubmit,
  };
}

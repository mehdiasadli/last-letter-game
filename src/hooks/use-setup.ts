import { getStartSeconds } from '../lib/utils';
import { useGameConfigStore } from '../stores/game-config.store';
import { useGamePackStore } from '../stores/game-pack.store';
import { useGameStore } from '../stores/game.store';
import { usePlayersStore } from '../stores/players.store';
import { useCountdown } from './use-countdown';
import { useInitGame } from './use-init-game';
import { useWords } from './use-words';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export function useSetup() {
  const { pack } = useGamePackStore();
  const { players, eliminatePlayer } = usePlayersStore();
  const { currentRound, currentPlayer, currentLetter, nextPlayerOnTimeout, usedWords, checkGameEndCondition, endGame } =
    useGameStore();
  const words = useWords();
  const { gameSpeed } = useGameConfigStore();
  const navigate = useNavigate();
  const { formattedTime, restart, status } = useCountdown({
    start: getStartSeconds({ remainingWords: words.length, round: currentRound, speed: gameSpeed }),
    onEnd() {
      // Eliminate current player
      if (currentPlayer) {
        eliminatePlayer(currentPlayer);
        toast.error(`${currentPlayer} was eliminated! Time's up!`, {
          position: 'top-center',
          richColors: true,
          duration: 3000,
        });
      }

      // Get available words for the current letter
      const availableWords = words
        .filter((w) => w.main.toLowerCase().startsWith(currentLetter.toLowerCase()) && !usedWords.includes(w.main))
        .map((w) => w.main);

      // Get updated players after elimination
      const updatedPlayers = players.map((p) => (p.name === currentPlayer ? { ...p, eliminated: true } : p));

      // Check game end condition with updated players
      const gameEndCondition = checkGameEndCondition(updatedPlayers, availableWords);

      if (gameEndCondition === 'no-winner') {
        // All players eliminated - no winner
        endGame();
        toast.error('Game Over! All players have been eliminated!', {
          position: 'top-center',
          richColors: true,
          duration: 3000,
        });
        navigate('/result');
        return;
      }

      if (gameEndCondition === 'winner') {
        // Single player wins (no words available)
        const winner = players.find((p) => !p.eliminated)?.name;
        endGame(winner || undefined);
        toast.success(`Game Over! ${winner} wins!`, {
          position: 'top-center',
          richColors: true,
          duration: 3000,
        });
        navigate('/result');
        return;
      }

      if (gameEndCondition === 'winners') {
        // Multiple players win (no words available)
        const winners = players.filter((p) => !p.eliminated).map((p) => p.name);
        endGame(undefined, winners);
        toast.success(`Game Over! ${winners.join(', ')} win!`, {
          position: 'top-center',
          richColors: true,
          duration: 3000,
        });
        navigate('/result');
        return;
      }

      if (gameEndCondition === 'single-player') {
        // Single player scenario - they need to find a word
        const singlePlayer = updatedPlayers.find((p) => !p.eliminated)?.name;
        toast.info(`${singlePlayer} is the last player! Find a word to win!`, {
          position: 'top-center',
          richColors: true,
          duration: 3000,
        });
        // Continue the game for the single player
        nextPlayerOnTimeout(updatedPlayers);
        const remainingWords = words.filter((w) => !usedWords.includes(w.main)).length;
        restart(getStartSeconds({ remainingWords, round: currentRound, speed: gameSpeed }));
        return;
      }

      // Continue game with multiple players
      nextPlayerOnTimeout(updatedPlayers);
      const remainingWords = words.filter((w) => !usedWords.includes(w.main)).length;
      restart(getStartSeconds({ remainingWords, round: currentRound, speed: gameSpeed }));
    },
  });

  useInitGame();

  return {
    time: formattedTime,
    timeStatus: status,
    restart,
    get canStart() {
      return pack && players.length && words.length;
    },
  };
}

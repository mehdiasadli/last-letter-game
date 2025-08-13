import { useGameStore } from '../stores/game.store';
import { usePlayersStore } from '../stores/players.store';
import { useWords } from './use-words';
import { useGameConfigStore } from '../stores/game-config.store';
import { toast } from 'sonner';

export function useLeaveGame() {
  const { currentPlayer, currentRound, currentLetter, usedWords, checkGameEndCondition, endGame, nextPlayerOnTimeout } =
    useGameStore();
  const { players, eliminatePlayer } = usePlayersStore();
  const words = useWords();
  const { gameSpeed } = useGameConfigStore();

  const handleLeaveGame = (playerName: string) => {
    // Eliminate the player
    eliminatePlayer(playerName);

    // Show notification
    toast.info(`${playerName} left the game`, {
      position: 'top-center',
      richColors: true,
      duration: 2000,
    });

    // Get available words for the current letter
    const availableWords = words
      .filter((w) => w.main.toLowerCase().startsWith(currentLetter.toLowerCase()) && !usedWords.includes(w.main))
      .map((w) => w.main);

    // Get updated players after elimination
    const updatedPlayers = players.map(p => 
      p.name === playerName ? { ...p, eliminated: true } : p
    );

    // Check game end condition with updated players
    const gameEndCondition = checkGameEndCondition(updatedPlayers, availableWords);

    if (gameEndCondition === 'no-winner') {
      // All players eliminated - no winner
      endGame();
      toast.error('Game Over! All players have left!', {
        position: 'top-center',
        richColors: true,
        duration: 3000,
      });
      return;
    }

    if (gameEndCondition === 'winner') {
      // Single player wins (no words available)
      const winner = updatedPlayers.find((p) => !p.eliminated)?.name;
      endGame(winner || undefined);
      toast.success(`Game Over! ${winner} wins!`, {
        position: 'top-center',
        richColors: true,
        duration: 3000,
      });
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
      return;
    }

    // Continue game with multiple players
    nextPlayerOnTimeout(updatedPlayers);
  };

  return {
    handleLeaveGame,
    canLeave: (playerName: string) => {
      // Only allow leaving if the player is not already eliminated
      const player = players.find((p) => p.name === playerName);
      return player && !player.eliminated;
    },
  };
}

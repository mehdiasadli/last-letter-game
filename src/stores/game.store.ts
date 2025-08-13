import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TGameStore = {
  currentPlayer: string;
  currentRound: number;
  currentLetter: string;
  usedWords: string[];
  gameEnded: boolean;
  winner: string | null;
  winners: string[]; // Array for multiple winners
  pulsingWord: string | null;
  setWord: (word: string) => void;
  nextTurn: (params: {
    players: { name: string; eliminated: boolean }[];
    lastWord: string;
    availableWords: string[];
  }) => void;
  nextPlayerOnTimeout: (players: { name: string; eliminated: boolean }[]) => void;
  setCurrentPlayer: (player: string) => void;
  setCurrentRound: (round: number) => void;
  setCurrentLetter: (letter: string) => void;
  isGameOver: (players: { name: string; eliminated: boolean }[]) => boolean;
  checkGameEndCondition: (
    players: { name: string; eliminated: boolean }[],
    availableWords: string[]
  ) => 'no-winner' | 'winner' | 'winners' | 'single-player' | 'continue';
  endGame: (winner?: string, winners?: string[]) => void;
  setPulsingWord: (word: string | null) => void;

  reset: () => void;
};

export const useGameStore = create<TGameStore>()(
  persist(
    (set) => ({
      currentPlayer: '',
      currentRound: 1,
      currentLetter: '',
      usedWords: [] as string[],
      gameEnded: false,
      winner: null,
      winners: [] as string[],
      pulsingWord: null,
      setWord: (word: string) => set((state) => ({ usedWords: [...state.usedWords, word] })),
      nextTurn: ({ players, lastWord, availableWords }) =>
        set((state) => {
          const alivePlayers = players.filter((p) => !p.eliminated).map((p) => p.name);
          if (alivePlayers.length === 0) return state;

          const currentIndex = Math.max(0, alivePlayers.indexOf(state.currentPlayer));
          const nextIndex = (currentIndex + 1) % alivePlayers.length;
          const nextPlayer = alivePlayers[nextIndex];

          // compute next letter by scanning the last word from the end backwards
          const last = lastWord.trim();
          const isAlpha = (c: string) => /[a-z]/i.test(c);
          let foundLetter = last.slice(-1).toUpperCase();
          let foundValidLetter = false;

          for (let i = last.length - 1; i >= 0; i--) {
            const ch = last[i];
            if (!isAlpha(ch)) continue;
            const letter = ch.toUpperCase();
            const hasWord = availableWords.some((w) => w.toLowerCase().startsWith(letter.toLowerCase()));
            if (hasWord) {
              foundLetter = letter;
              foundValidLetter = true;
              break;
            }
          }

          // If no letter from the last word has available words, find a random available letter
          if (!foundValidLetter) {
            const availableLetters = [...new Set(availableWords.map((word) => word[0].toUpperCase()))];
            if (availableLetters.length > 0) {
              foundLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)];
            }
          }

          return { currentPlayer: nextPlayer, currentRound: state.currentRound + 1, currentLetter: foundLetter };
        }),
      nextPlayerOnTimeout: (players: { name: string; eliminated: boolean }[]) =>
        set((state) => {
          const alivePlayers = players.filter((p) => !p.eliminated).map((p) => p.name);
          if (alivePlayers.length === 0) return state;

          // Find the index of the current player in the original players array
          const currentPlayerIndex = players.findIndex((p) => p.name === state.currentPlayer);

          // Find the next non-eliminated player after the current player
          let nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
          while (players[nextPlayerIndex].eliminated) {
            nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
            // If we've gone through all players and they're all eliminated, break
            if (nextPlayerIndex === currentPlayerIndex) break;
          }

          const nextPlayer = players[nextPlayerIndex].name;

          // Keep the same round and letter, just change the player
          return { currentPlayer: nextPlayer };
        }),
      isGameOver: (players: { name: string; eliminated: boolean }[]) => {
        const alivePlayers = players.filter((p) => !p.eliminated);
        return alivePlayers.length <= 1; // Game is over when only 1 or 0 players remain
      },
      checkGameEndCondition: (players: { name: string; eliminated: boolean }[], availableWords: string[]) => {
        const alivePlayers = players.filter((p) => !p.eliminated);

        // No players left - no winner
        if (alivePlayers.length === 0) {
          return 'no-winner';
        }

        // Check if there are any words available
        const hasAvailableWords = availableWords.length > 0;

        // Only one player left
        if (alivePlayers.length === 1) {
          if (hasAvailableWords) {
            return 'single-player';
          } else {
            // No words available, single player wins by default
            return 'winner';
          }
        }

        // Multiple players still alive
        if (alivePlayers.length > 1) {
          if (!hasAvailableWords) {
            // No words available, all remaining players are winners
            return 'winners';
          }
        }

        // Continue game
        return 'continue';
      },
      endGame: (winner?: string, winners?: string[]) =>
        set({
          gameEnded: true,
          winner: winner || null,
          winners: winners || [],
        }),
      setCurrentPlayer: (player: string) => set({ currentPlayer: player }),
      setCurrentRound: (round: number) => set({ currentRound: round }),
      setCurrentLetter: (letter: string) => set({ currentLetter: letter }),
      setPulsingWord: (word: string | null) => set({ pulsingWord: word }),

      reset: () =>
        set({
          currentPlayer: '',
          currentRound: 1,
          currentLetter: '',
          usedWords: [],
          gameEnded: false,
          winner: null,
          winners: [],
          pulsingWord: null,
        }),
    }),
    { name: 'game' }
  )
);

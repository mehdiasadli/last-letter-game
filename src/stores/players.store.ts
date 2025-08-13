import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TPlayer = {
  name: string;
  eliminated: boolean;
};

export type TPlayersStore = {
  players: TPlayer[];
  host: string | null;
  addPlayer: (name: string) => void; // Add a player
  removePlayer: (name: string) => void; // Remove a player
  eliminatePlayer: (name: string) => void; // Eliminate a player
  setPlayers: (players: string[]) => void; // Set the players
  setHost: (host: string) => void; // Set the host
  reset: () => void; // Reset the store
  resetEliminatedStatus: () => void; // Reset only the eliminated status
};

export const usePlayersStore = create<TPlayersStore>()(
  persist(
    (set) => ({
      players: [],
      host: null,
      setHost: (host: string) =>
        set((state) => {
          const normalizedHost = host.trim();

          if (!normalizedHost) {
            return state;
          }

          if (!state.players.find((p) => p.name === normalizedHost)) {
            return state;
          }

          return { host: normalizedHost };
        }),
      addPlayer: (name: string) => {
        set((state) => {
          const normalizedName = name.trim();

          if (!normalizedName) {
            return state;
          }

          if (state.players.find((p) => p.name === normalizedName)) {
            return state;
          }

          // check if he/she is the first player
          if (state.players.length === 0) {
            return { host: normalizedName, players: [{ name: normalizedName, eliminated: false }] };
          }

          return { players: [...state.players, { name: normalizedName, eliminated: false }] };
        });
      },
      removePlayer: (name: string) =>
        set((state) => {
          const normalizedName = name.trim();

          if (state.host === normalizedName) {
            return {
              host: null,
              players: state.players.filter((p) => p.name !== normalizedName).map((p) => ({ ...p, eliminated: true })),
            };
          }

          return {
            players: state.players.filter((p) => p.name !== normalizedName).map((p) => ({ ...p, eliminated: true })),
          };
        }),
      eliminatePlayer: (name: string) =>
        set((state) => {
          const normalizedName = name.trim();

          return {
            players: state.players.map((p) => (p.name === normalizedName ? { ...p, eliminated: true } : p)),
          };
        }),
      setPlayers: (players: string[]) =>
        set(() => {
          const normalizedPlayers = players.map((p) => p.trim());

          return { players: [...new Set(normalizedPlayers.map((p) => ({ name: p, eliminated: false })))] };
        }),
      reset: () => set({ players: [], host: null }),
      resetEliminatedStatus: () =>
        set((state) => ({
          players: state.players.map((p) => ({ ...p, eliminated: false })),
        })),
    }),
    {
      name: 'players',
    }
  )
);

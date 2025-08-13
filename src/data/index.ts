// data of the packs
import {
  chemicalElements,
  countries,
  imdbTop250,
  landlockedCountries,
  nationalCapitals,
  usStates,
  zodiacSigns,
} from './packs';
import type { GameData } from './types';

export const data = {
  packs: [countries, usStates, landlockedCountries, chemicalElements, nationalCapitals, imdbTop250, zodiacSigns],
} as const satisfies GameData;

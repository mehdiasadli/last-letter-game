// data of the packs
import { chemicalElements, countries, landlockedCountries, nationalCapitals, usStates, zodiacSigns } from './packs';
import type { GameData } from './types';

export const data = {
  packs: [countries, usStates, landlockedCountries, zodiacSigns, chemicalElements, nationalCapitals],
} as const satisfies GameData;

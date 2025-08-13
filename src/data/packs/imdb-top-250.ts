import { createPack } from '../create-pack';

export const imdbTop250 = createPack(
  'IMDB Top 250',
  {
    en: ['The Godfather', 'The Godfather: Part Two', 'The Dark Knight'],
  },
  {
    description: 'The list of the top 250 movies on IMDB',
    category: ['Entertainment', 'Movies'],
  }
);

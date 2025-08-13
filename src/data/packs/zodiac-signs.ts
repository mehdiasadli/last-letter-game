import { createPack } from '../create-pack';

export const zodiacSigns = createPack(
  'Zodiac Signs',
  {
    en: [
      'Aries',
      'Taurus',
      'Gemini',
      'Cancer',
      'Leo',
      'Virgo',
      'Libra',
      'Scorpio',
      'Sagittarius',
      'Capricorn',
      'Aquarius',
      'Pisces',
    ],
    az: [
      { main: 'Qoç', regexes: [/qoch?/i] },
      { main: 'Buğa', regexes: [/bu(q|g)a/i] },
      { main: 'Əkizlər', regexes: [/(e|ə)kizl(e|ə)r/i] },
      { main: 'Xərçəng', regexes: [/x(e|ə)r(c|ç)h?(e|ə)ng/i] },
      { main: 'Şir', regexes: [/sh?ir/i] },
      { main: 'Qız', regexes: [/q(i|ı)z/i] },
      { main: 'Tərəzi', regexes: [/t(e|ə)r(e|ə)zi/i] },
      { main: 'Əqrəb', regexes: [/(e|ə)qr(e|ə)b/i] },
      { main: 'Oxatan', regexes: [/ox(a|ə)tan/i] },
      { main: 'Oğlaq', regexes: [/o(g|ğ|q)laq/i] },
      { main: 'Dolça', regexes: [/dol(c|ç)a/i] },
      { main: 'Balıqlar', regexes: [/bal(i|ı)qlar/i] },
    ],
  },
  {
    description: 'The 12 zodiac signs, according to the Western zodiac',
    category: ['Culture', 'Astrology'],
  }
);

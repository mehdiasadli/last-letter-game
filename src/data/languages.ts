export type Language = {
  code: string;
  name: string;
};

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'az', name: 'Azərbaycan dili' },
  { code: 'ru', name: 'Русский' },
] as const satisfies readonly Language[];

export type LanguageCode = (typeof languages)[number]['code'];

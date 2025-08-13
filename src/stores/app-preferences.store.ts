import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { languages } from '../data/languages';
import { z } from 'zod';

const languageSchema = z.enum(languages.map((l) => l.code) as [string, ...string[]], {
  errorMap: () => {
    return { message: 'Invalid language', code: 'invalid_type' };
  },
});

const colorsSchema = z.enum(
  [
    'dark',
    'gray',
    'red',
    'pink',
    'grape',
    'violet',
    'indigo',
    'blue',
    'cyan',
    'green',
    'lime',
    'yellow',
    'orange',
    'teal',
  ],
  {
    errorMap: () => {
      return { message: 'Invalid color', code: 'invalid_type' };
    },
  }
);

const themeSchema = z.enum(['light', 'dark', 'auto'], {
  errorMap: () => {
    return { message: 'Invalid theme', code: 'invalid_type' };
  },
});

const radiusSchema = z.enum(['xs', 'sm', 'md', 'lg', 'xl'], {
  errorMap: () => {
    return { message: 'Invalid radius', code: 'invalid_type' };
  },
});

const spacingSchema = z.enum(['xs', 'sm', 'md', 'lg', 'xl'], {
  errorMap: () => {
    return { message: 'Invalid spacing', code: 'invalid_type' };
  },
});

const fontSchema = z.enum(
  [
    'Inter',
    'Roboto',
    'Open Sans',
    'Lato',
    'Poppins',
    'Montserrat',
    'Source Sans Pro',
    'Nunito',
    'Ubuntu',
    'Playfair Display',
  ],
  {
    errorMap: () => {
      return { message: 'Invalid font', code: 'invalid_type' };
    },
  }
);

const fontSizeSchema = z.enum(['xs', 'sm', 'md', 'lg', 'xl'], {
  errorMap: () => {
    return { message: 'Invalid font size', code: 'invalid_type' };
  },
});

export type TAppPreferences = {
  language: z.infer<typeof languageSchema>;
  primaryColor: z.infer<typeof colorsSchema>;
  theme: z.infer<typeof themeSchema>;
  radius: z.infer<typeof radiusSchema>;
  spacing: z.infer<typeof spacingSchema>;
  headingFont: z.infer<typeof fontSchema>;
  bodyFont: z.infer<typeof fontSchema>;
  headingFontSize: z.infer<typeof fontSizeSchema>;
  bodyFontSize: z.infer<typeof fontSizeSchema>;
  setLanguage: (language: z.infer<typeof languageSchema>) => void;
  setPrimaryColor: (color: z.infer<typeof colorsSchema>) => void;
  setTheme: (theme: z.infer<typeof themeSchema>) => void;
  setRadius: (radius: z.infer<typeof radiusSchema>) => void;
  setSpacing: (spacing: z.infer<typeof spacingSchema>) => void;
  setHeadingFont: (font: z.infer<typeof fontSchema>) => void;
  setBodyFont: (font: z.infer<typeof fontSchema>) => void;
  setHeadingFontSize: (size: z.infer<typeof fontSizeSchema>) => void;
  setBodyFontSize: (size: z.infer<typeof fontSizeSchema>) => void;
};

export const useAppPreferencesStore = create<TAppPreferences>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language: z.infer<typeof languageSchema>) => {
        return set(() => {
          const parsed = languageSchema.safeParse(language);

          if (parsed.success) {
            return { language: parsed.data };
          }

          return { language: 'en' };
        });
      },

      primaryColor: 'green',
      setPrimaryColor: (color: z.infer<typeof colorsSchema>) => {
        return set(() => {
          const parsed = colorsSchema.safeParse(color);

          if (parsed.success) {
            return { primaryColor: parsed.data };
          }

          return { primaryColor: 'green' };
        });
      },

      theme: 'auto',
      setTheme: (theme: z.infer<typeof themeSchema>) => {
        return set(() => {
          const parsed = themeSchema.safeParse(theme);

          if (parsed.success) {
            return { theme: parsed.data };
          }

          return { theme: 'auto' };
        });
      },

      radius: 'md',
      setRadius: (radius: z.infer<typeof radiusSchema>) => {
        return set(() => {
          const parsed = radiusSchema.safeParse(radius);

          if (parsed.success) {
            return { radius: parsed.data };
          }

          return { radius: 'md' };
        });
      },

      spacing: 'md',
      setSpacing: (spacing: z.infer<typeof spacingSchema>) => {
        return set(() => {
          const parsed = spacingSchema.safeParse(spacing);

          if (parsed.success) {
            return { spacing: parsed.data };
          }

          return { spacing: 'md' };
        });
      },

      headingFont: 'Inter',
      setHeadingFont: (font: z.infer<typeof fontSchema>) => {
        return set(() => {
          const parsed = fontSchema.safeParse(font);

          if (parsed.success) {
            return { headingFont: parsed.data };
          }

          return { headingFont: 'Inter' };
        });
      },

      bodyFont: 'Inter',
      setBodyFont: (font: z.infer<typeof fontSchema>) => {
        return set(() => {
          const parsed = fontSchema.safeParse(font);

          if (parsed.success) {
            return { bodyFont: parsed.data };
          }

          return { bodyFont: 'Inter' };
        });
      },

      headingFontSize: 'md',
      setHeadingFontSize: (size: z.infer<typeof fontSizeSchema>) => {
        return set(() => {
          const parsed = fontSizeSchema.safeParse(size);

          if (parsed.success) {
            return { headingFontSize: parsed.data };
          }

          return { headingFontSize: 'md' };
        });
      },

      bodyFontSize: 'md',
      setBodyFontSize: (size: z.infer<typeof fontSizeSchema>) => {
        return set(() => {
          const parsed = fontSizeSchema.safeParse(size);

          if (parsed.success) {
            return { bodyFontSize: parsed.data };
          }

          return { bodyFontSize: 'md' };
        });
      },
    }),
    { name: 'app-preferences' }
  )
);

import { MantineProvider, createTheme } from '@mantine/core';
import { emotionTransform } from '@mantine/emotion';
import { useAppPreferencesStore } from '../stores/app-preferences.store';
import { createAppColorSchemeManager } from '../lib/color-scheme-manager';

// Convert spacing string to actual spacing values
const getSpacingValues = (spacing: string) => {
  const spacingMap = {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
  };
  return spacingMap[spacing as keyof typeof spacingMap] || '1rem';
};

// Convert font size string to actual font size values
const getFontSizeValues = (size: string) => {
  const fontSizeMap = {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  };
  return fontSizeMap[size as keyof typeof fontSizeMap] || '1rem';
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { primaryColor, radius, spacing, headingFont, bodyFont, headingFontSize, bodyFontSize } =
    useAppPreferencesStore();

  const mantineTheme = createTheme({
    primaryColor,
    fontFamily: bodyFont,
    fontSizes: {
      xs: getFontSizeValues(bodyFontSize),
      sm: getFontSizeValues(bodyFontSize),
      md: getFontSizeValues(bodyFontSize),
      lg: getFontSizeValues(bodyFontSize),
      xl: getFontSizeValues(bodyFontSize),
    },
    headings: {
      fontFamily: headingFont,
      sizes: {
        h1: { fontSize: getFontSizeValues(headingFontSize) },
        h2: { fontSize: getFontSizeValues(headingFontSize) },
        h3: { fontSize: getFontSizeValues(headingFontSize) },
        h4: { fontSize: getFontSizeValues(headingFontSize) },
        h5: { fontSize: getFontSizeValues(headingFontSize) },
        h6: { fontSize: getFontSizeValues(headingFontSize) },
      },
    },
    radius: {
      xs: '0.125rem',
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
    },
    spacing: {
      xs: getSpacingValues(spacing),
      sm: getSpacingValues(spacing),
      md: getSpacingValues(spacing),
      lg: getSpacingValues(spacing),
      xl: getSpacingValues(spacing),
    },
    defaultRadius: radius,
    components: {
      Card: {
        defaultProps: {
          radius: radius,
        },
      },
      Button: {
        defaultProps: {
          radius: radius,
        },
      },
      TextInput: {
        defaultProps: {
          radius: radius,
        },
      },
      Select: {
        defaultProps: {
          radius: radius,
        },
      },
      Badge: {
        defaultProps: {
          radius: radius,
        },
      },
    },
  });

  return (
    <MantineProvider
      theme={mantineTheme}
      colorSchemeManager={createAppColorSchemeManager()}
      stylesTransform={emotionTransform}
      withCssVariables
    >
      {children}
    </MantineProvider>
  );
}

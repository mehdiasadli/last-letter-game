import type { MantineColorSchemeManager } from '@mantine/core';
import { useAppPreferencesStore } from '../stores/app-preferences.store';

type MantineColorScheme = 'light' | 'dark' | 'auto';

export function createAppColorSchemeManager(): MantineColorSchemeManager {
  return {
    get: (defaultValue: MantineColorScheme) => {
      if (typeof window === 'undefined') {
        return defaultValue;
      }

      try {
        const stored = window.localStorage.getItem('app-preferences');
        if (stored) {
          const preferences = JSON.parse(stored);
          return preferences.state?.theme || defaultValue;
        }
        return defaultValue;
      } catch {
        return defaultValue;
      }
    },

    set: (value: MantineColorScheme) => {
      try {
        // Update our app preferences store
        useAppPreferencesStore.getState().setTheme(value);
      } catch (error) {
        console.warn('Failed to set color scheme:', error);
      }
    },

    subscribe: () => {},

    unsubscribe: () => {},

    clear: () => {
      try {
        const stored = window.localStorage.getItem('app-preferences');
        if (stored) {
          const preferences = JSON.parse(stored);
          delete preferences.state.theme;
          window.localStorage.setItem('app-preferences', JSON.stringify(preferences));
        }
      } catch (error) {
        console.warn('Failed to clear color scheme:', error);
      }
    },
  };
}

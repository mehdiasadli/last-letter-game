import '@mantine/core/styles.css';

import { MantineEmotionProvider } from '@mantine/emotion';
import { ModalsProvider } from '@mantine/modals';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './theme-provider';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <MantineEmotionProvider>
            <ModalsProvider>{children}</ModalsProvider>
            <Toaster />
          </MantineEmotionProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

'use client';

import './globals.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/service/react-query-client';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}

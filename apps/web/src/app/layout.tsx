import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Providers } from './providers';
import { GlobalLayout } from '@/widgets/layout';
import './globals.css';

export const metadata: Metadata = {
  title: 'HAPZOO - Ensemble Playground',
  description: '음악 동호인을 위한 합주·연습·모집·일정 관리 플랫폼',
};

export const viewport: Viewport = {
  themeColor: '#84cc16',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <GlobalLayout>{children}</GlobalLayout>
        </Providers>
      </body>
    </html>
  );
}

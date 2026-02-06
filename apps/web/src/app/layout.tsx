import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: '앙상블 - 음악 동호인을 위한 워크스페이스',
  description: '밴드/아카펠라/오케스트라를 위한 합주·연습·모집·일정 관리 SaaS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

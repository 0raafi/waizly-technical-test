import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Providers from '../components/Providers';

import './globals.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: '✅ Todo App - Waizly Test',
  description: 'Frontend Waizly Test',
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.className
        )}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
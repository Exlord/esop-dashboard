import './globals.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Providers } from '@/app/Providers';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className="min-h-screen bg-gray-50 antialiased">
    <Providers>{children}</Providers>
    </body>
    </html>
  );
}

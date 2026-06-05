import { Metadata } from 'next';
import Layout from '@/components/Layout';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | CycleHub',
    default: 'CycleHub - Privacy-first Period Tracker',
  },
  description: 'Track your cycle visually, predict key dates instantly, and save everything locally on your device.',
  other: {
    'google-adsense-account': 'ca-pub-6393936268623951',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[var(--background)] text-[var(--foreground)]">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

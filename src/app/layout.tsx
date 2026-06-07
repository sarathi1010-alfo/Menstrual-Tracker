import { Metadata } from 'next';
import Script from 'next/script';
import Layout from '@/components/Layout';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | CycleHub',
    default: 'CycleHub - Privacy-first Period Tracker',
  },
  description: 'Track your cycle visually, predict key dates instantly, and save everything locally on your device.',
  keywords: ['period tracker', 'menstrual cycle', 'ovulation calculator', 'privacy period tracker', 'local storage cycle tracker'],
  alternates: {
    canonical: 'https://cyclehub.alfo.online',
  },
  openGraph: {
    title: 'CycleHub - Privacy-first Period Tracker',
    description: 'Track your cycle visually, predict key dates instantly, and save everything locally on your device.',
    url: 'https://cyclehub.alfo.online',
    siteName: 'CycleHub',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CycleHub - Privacy-first Period Tracker',
    description: 'Track your cycle visually, predict key dates instantly, and save everything locally on your device.',
  },
  other: {
    'google-adsense-account': 'ca-pub-6393936268623951',
  },
};

const defaultSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CycleHub",
  "url": "https://cyclehub.alfo.online",
  "description": "Privacy-first menstrual cycle tracking tool. Calculate ovulation and track your period locally.",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HZQ3QT11QC"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-HZQ3QT11QC');
          `}
        </Script>
        <SchemaMarkup schema={defaultSchema} />
      </head>
      <body className="antialiased bg-[var(--background)] text-[var(--foreground)]">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

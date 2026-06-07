import { Metadata } from 'next';
import Script from 'next/script';
import Layout from '@/components/Layout';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { constructMetadata, siteConfig, absoluteUrl } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = constructMetadata({
  title: 'CycleHub - Privacy-first Period Tracker',
  description: 'Track your cycle visually, predict key dates instantly, and save everything locally on your device.',
});

const defaultSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": siteConfig.name,
  "url": absoluteUrl('/'),
  "description": siteConfig.description,
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

import { Metadata } from 'next';

// Centralized configuration for the site
export const siteConfig = {
  // Use environment variable in production, fallback for local dev
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  name: 'CycleHub',
  description: 'Track your cycle visually, predict key dates instantly, and save everything locally on your device.',
  creator: 'alfo.online',
  ecosystemHub: 'https://hub.alfo.online',
};

/**
 * Returns a fully qualified absolute URL.
 * Essential for OpenGraph images, canonicals, and sitemaps.
 */
export function absoluteUrl(path: string) {
  // Prevent double slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${cleanPath}`;
}

/**
 * Reusable metadata helper for consistent SEO across pages.
 */
export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = '/og-image.png', // Add a default og-image in public/ later
  icons = '/favicon.ico',
  noIndex = false,
  path = '',
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  path?: string;
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: absoluteUrl(path),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      images: [
        {
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(image)],
      creator: '@alfo_online', // Replace with your actual handle
    },
    icons,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'google-adsense-account': 'ca-pub-6393936268623951', // Assuming this remains the same
      monetag: '86950f5308b2a836fd804730ef0e5e7d',
    },
  };
}

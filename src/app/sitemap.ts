import { MetadataRoute } from 'next';
import { getGuideSlugs } from '@/lib/mdx';
import seoData from '@/data/pSeoData.json';
import { absoluteUrl } from '@/lib/seo';
import { getAllArticles } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  // Use a string to ensure no timezone fluctuation for static generation,
  // Next.js MetadataRoute.Sitemap allows Date objects or strings,
  // but to avoid "Couldn't fetch" parsing errors from malformed date outputs,
  // we can use a stable ISO string without milliseconds.
  const currentDateStr = new Date().toISOString().split('T')[0];

  // Static core pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: absoluteUrl('/tracker'),
      lastModified: currentDateStr,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: absoluteUrl('/guides'),
      lastModified: currentDateStr,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: absoluteUrl('/blog'),
      lastModified: currentDateStr,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: absoluteUrl('/faq'),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: absoluteUrl('/about'),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: absoluteUrl('/privacy'),
      lastModified: currentDateStr,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
    {
      url: absoluteUrl('/terms-of-service'),
      lastModified: currentDateStr,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
    {
      url: absoluteUrl('/contact'),
      lastModified: currentDateStr,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
  ];

  // Dynamic programmatic SEO pages (Legacy Guides)
  const guideSlugs = getGuideSlugs() || [];
  const guideRoutes: MetadataRoute.Sitemap = guideSlugs
    .filter((slug) => slug && slug.trim() !== '')
    .map((slug) => ({
      url: absoluteUrl(`/guides/${slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  const toolsData = seoData || [];
  const toolRoutes: MetadataRoute.Sitemap = toolsData
    .filter((tool) => tool && tool.slug && tool.slug.trim() !== '')
    .map((tool) => ({
      url: absoluteUrl(`/tools/${tool.slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }));

  // Dynamic Blog Articles
  const articles = getAllArticles() || [];
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => {
    let routePrefix = '';
    switch (article.category) {
      case 'what-is':
        routePrefix = ''; // Root level
        break;
      case 'use-cases':
        routePrefix = '/use-cases';
        break;
      case 'conditions':
        routePrefix = '/conditions';
        break;
      case 'cluster':
      default:
        routePrefix = '/blog';
        break;
    }

    const path = routePrefix ? `${routePrefix}/${article.slug}` : `/${article.slug}`;

    return {
      url: absoluteUrl(path),
      lastModified: currentDateStr,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    };
  });

  return [...staticRoutes, ...guideRoutes, ...toolRoutes, ...articleRoutes];
}

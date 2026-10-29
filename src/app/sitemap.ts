import { MetadataRoute } from 'next';
import { getAllGuides, getAllArticles } from '@/lib/mdx';
import seoData from '@/data/pSeoData.json';
import { absoluteUrl } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
      url: absoluteUrl('/blog'),
      lastModified: currentDateStr,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: absoluteUrl('/features'),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: absoluteUrl('/guides'),
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

  // Old Guides
  const guides = getAllGuides() || [];
  const guideRoutes: MetadataRoute.Sitemap = guides
    .filter((guide) => guide.slug && guide.slug.trim() !== '')
    .map((guide) => ({
      url: absoluteUrl(`/guides/${guide.slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  // New Blog Articles & explicit routes
  const articles = getAllArticles() || [];
  const articleRoutes: MetadataRoute.Sitemap = articles
    .filter((article) => article.slug && article.slug.trim() !== '')
    .map((article) => {
      // If it's a micro-answer, it maps to root /slug
      const urlPath = article.category === 'what-is' ? `/${article.slug}` : `/blog/${article.slug}`;
      return {
        url: absoluteUrl(urlPath),
        lastModified: currentDateStr,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      };
    });

  const toolsData = seoData || [];
  const toolRoutes: MetadataRoute.Sitemap = toolsData
    .filter((tool) => tool && tool.slug && tool.slug.trim() !== '')
    .map((tool) => ({
      url: absoluteUrl(`/tools/${tool.slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }));

  return [...staticRoutes, ...guideRoutes, ...articleRoutes, ...toolRoutes];
}

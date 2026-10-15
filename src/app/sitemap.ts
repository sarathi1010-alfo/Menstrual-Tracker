import { MetadataRoute } from 'next';
import { getGuideSlugs } from '@/lib/mdx';
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
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: absoluteUrl('/tracker'),
      lastModified: currentDateStr,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/guides'),
      lastModified: currentDateStr,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/faq'),
      lastModified: currentDateStr,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/about'),
      lastModified: currentDateStr,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: absoluteUrl('/privacy'),
      lastModified: currentDateStr,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: absoluteUrl('/terms-of-service'),
      lastModified: currentDateStr,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: absoluteUrl('/contact'),
      lastModified: currentDateStr,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];

  // Dynamic programmatic SEO pages
  const guideSlugs = getGuideSlugs() || [];
  const guideRoutes: MetadataRoute.Sitemap = guideSlugs
    .filter((slug) => slug && slug.trim() !== '')
    .map((slug) => ({
      url: absoluteUrl(`/guides/${slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 0.7, // Internal programmatic pages get high but sub-core priority
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

  // Dynamic Blog & Educational Pages
  const { getAllArticles } = await import('@/lib/mdx');
  const allArticles = getAllArticles() || [];

  const articleRoutes: MetadataRoute.Sitemap = allArticles
    .filter((article) => article && article.slug && article.slug.trim() !== '')
    .map((article) => {
      let routePath = `/blog/${article.slug}`;

      if (article.category === 'what-is' || article.category === 'micro-answer') {
        routePath = `/${article.slug}`;
      } else if (article.category === 'use-cases') {
        routePath = `/use-cases/${article.slug}`;
      } else if (article.category === 'conditions') {
        routePath = `/conditions/${article.slug}`;
      }

      return {
        url: absoluteUrl(routePath),
        lastModified: currentDateStr,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      };
    });

  return [...staticRoutes, ...guideRoutes, ...toolRoutes, ...articleRoutes];
}

import { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';
import seoData from '@/data/pSeoData.json';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const mdxModule = await import('@/lib/mdx');
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
  const guideSlugs = mdxModule.getGuideSlugs() || [];
  const guideRoutes: MetadataRoute.Sitemap = guideSlugs
    .filter((slug) => slug && slug.trim() !== '')
    .map((slug) => ({
      url: absoluteUrl(`/guides/${slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 0.7, // Internal programmatic pages get high but sub-core priority
    }));

  const articles = mdxModule.getAllArticles() || [];

  const blogRoutes: MetadataRoute.Sitemap = articles
    .filter((article) => article.category === 'blog' || !article.category)
    .map((article) => ({
      url: absoluteUrl(`/blog/${article.slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  const whatIsRoutes: MetadataRoute.Sitemap = articles
    .filter((article) => article.category === 'what-is')
    .map((article) => ({
      url: absoluteUrl(`/${article.slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  const useCaseRoutes: MetadataRoute.Sitemap = articles
    .filter((article) => article.category === 'use-cases')
    .map((article) => ({
      url: absoluteUrl(`/use-cases/${article.slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  const conditionRoutes: MetadataRoute.Sitemap = articles
    .filter((article) => article.category === 'conditions')
    .map((article) => ({
      url: absoluteUrl(`/conditions/${article.slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
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

  return [...staticRoutes, ...guideRoutes, ...blogRoutes, ...whatIsRoutes, ...useCaseRoutes, ...conditionRoutes, ...toolRoutes];
}

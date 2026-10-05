import { MetadataRoute } from 'next';
import { getGuideSlugs } from '@/lib/mdx';
import seoData from '@/data/pSeoData.json';
import { absoluteUrl } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDateStr = new Date().toISOString().split('T')[0];

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

  // Dynamic import for mdx logic
  const { getAllArticles } = await import('@/lib/mdx');
  const allArticles = getAllArticles();

  const blogRoutes: MetadataRoute.Sitemap = allArticles
    .filter((a) => a.category !== 'what-is' && a.category !== 'use-cases' && a.category !== 'conditions')
    .map((article) => ({
      url: absoluteUrl(`/blog/${article.slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  const whatIsRoutes: MetadataRoute.Sitemap = allArticles
    .filter((a) => a.category === 'what-is')
    .map((article) => ({
      url: absoluteUrl(`/${article.slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  const useCaseRoutes: MetadataRoute.Sitemap = allArticles
    .filter((a) => a.category === 'use-cases')
    .map((article) => ({
      url: absoluteUrl(`/use-cases/${article.slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  const conditionRoutes: MetadataRoute.Sitemap = allArticles
    .filter((a) => a.category === 'conditions')
    .map((article) => ({
      url: absoluteUrl(`/conditions/${article.slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...guideRoutes, ...toolRoutes, ...blogRoutes, ...whatIsRoutes, ...useCaseRoutes, ...conditionRoutes];
}

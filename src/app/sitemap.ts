import { MetadataRoute } from 'next';
import { getGuideSlugs, getAllArticles } from '@/lib/mdx';
import seoData from '@/data/pSeoData.json';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
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
      url: absoluteUrl('/blog'),
      lastModified: currentDateStr,
      changeFrequency: 'daily' as const,
      priority: 0.9,
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
      url: absoluteUrl('/features'),
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
  const guideSlugs = getGuideSlugs() || [];
  const guideRoutes: MetadataRoute.Sitemap = guideSlugs
    .filter((slug) => slug && slug.trim() !== '')
    .map((slug) => ({
      url: absoluteUrl(`/guides/${slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  // Tools
  const toolsData = seoData || [];
  const toolRoutes: MetadataRoute.Sitemap = toolsData
    .filter((tool) => tool && tool.slug && tool.slug.trim() !== '')
    .map((tool) => ({
      url: absoluteUrl(`/tools/${tool.slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }));

  // New Articles
  const allArticles = getAllArticles();

  const blogRoutes: MetadataRoute.Sitemap = allArticles
    .filter(a => a.category === 'blog')
    .map(a => ({
      url: absoluteUrl(`/blog/${a.slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  const whatIsRoutes: MetadataRoute.Sitemap = allArticles
    .filter(a => a.category === 'what-is')
    .map(a => ({
      url: absoluteUrl(`/${a.slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  const useCaseRoutes: MetadataRoute.Sitemap = allArticles
    .filter(a => a.category === 'use-cases')
    .map(a => ({
      url: absoluteUrl(`/use-cases/${a.slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  const conditionRoutes: MetadataRoute.Sitemap = allArticles
    .filter(a => a.category === 'conditions')
    .map(a => ({
      url: absoluteUrl(`/conditions/${a.slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  return [
    ...staticRoutes,
    ...guideRoutes,
    ...toolRoutes,
    ...blogRoutes,
    ...whatIsRoutes,
    ...useCaseRoutes,
    ...conditionRoutes
  ];
}

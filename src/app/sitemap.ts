import { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDateStr = new Date().toISOString().split('T')[0];

  const { getGuideSlugs, getAllArticles } = await import('@/lib/mdx');
  const seoData = (await import('@/data/pSeoData.json')).default;

  // Static core pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: absoluteUrl('/blog'),
      lastModified: currentDateStr,
      changeFrequency: 'daily' as const,
      priority: 0.9,
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

  const articles = getAllArticles() || [];
  const blogRoutes: MetadataRoute.Sitemap = articles
    .filter((article) => article && article.slug && article.slug.trim() !== '')
    .map((article) => {
      let path = '';
      switch (article.category) {
        case 'what-is':
          path = `/${article.slug}`;
          break;
        case 'use-cases':
          path = `/use-cases/${article.slug}`;
          break;
        case 'conditions':
          path = `/conditions/${article.slug}`;
          break;
        case 'cluster':
        default:
          path = `/blog/${article.slug}`;
          break;
      }
      return {
        url: absoluteUrl(path),
        lastModified: currentDateStr,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      };
    });

  return [...staticRoutes, ...guideRoutes, ...toolRoutes, ...blogRoutes];
}

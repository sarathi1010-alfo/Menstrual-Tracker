import { MetadataRoute } from 'next';
import { getGuideSlugs, getArticleSlugs, getArticleBySlug } from '@/lib/mdx';
import seoData from '@/data/pSeoData.json';
import { absoluteUrl } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDateStr = new Date().toISOString().split('T')[0];

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: currentDateStr, changeFrequency: 'monthly' as const, priority: 1 },
    { url: absoluteUrl('/tracker'), lastModified: currentDateStr, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: absoluteUrl('/guides'), lastModified: currentDateStr, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: absoluteUrl('/blog'), lastModified: currentDateStr, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: absoluteUrl('/faq'), lastModified: currentDateStr, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: absoluteUrl('/about'), lastModified: currentDateStr, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: absoluteUrl('/privacy'), lastModified: currentDateStr, changeFrequency: 'yearly' as const, priority: 0.6 },
    { url: absoluteUrl('/terms-of-service'), lastModified: currentDateStr, changeFrequency: 'yearly' as const, priority: 0.6 },
    { url: absoluteUrl('/contact'), lastModified: currentDateStr, changeFrequency: 'yearly' as const, priority: 0.6 },
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

  const articleSlugs = getArticleSlugs() || [];
  const articleRoutes: MetadataRoute.Sitemap = articleSlugs
    .map(slug => {
      const article = getArticleBySlug(slug);
      if (!article) return null;

      let path = '';
      if (article.meta.category === 'use-cases') {
        path = `/use-cases/${slug}`;
      } else if (article.meta.category === 'conditions') {
        path = `/conditions/${slug}`;
      } else if (article.meta.category === 'what-is') {
        path = `/${slug}`;
      } else {
        path = `/blog/${slug}`;
      }

      return {
        url: absoluteUrl(path),
        lastModified: currentDateStr,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      };
    }).filter((route): route is NonNullable<typeof route> => route !== null);

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

import { MetadataRoute } from 'next';
import { getGuideSlugs, getAllArticles } from '@/lib/mdx';
import seoData from '@/data/pSeoData.json';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
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

  const toolsData = seoData || [];
  const toolRoutes: MetadataRoute.Sitemap = toolsData
    .filter((tool) => tool && tool.slug && tool.slug.trim() !== '')
    .map((tool) => ({
      url: absoluteUrl(`/tools/${tool.slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }));

  const allArticles = getAllArticles() || [];

  const articleRoutes: MetadataRoute.Sitemap = allArticles
    .filter((article) => article.slug && article.slug.trim() !== '')
    .map((article) => {
      let urlPath = `/${article.slug}`;
      if (article.category === 'blog') urlPath = `/blog/${article.slug}`;
      else if (article.category === 'use-cases') urlPath = `/use-cases/${article.slug}`;
      else if (article.category === 'conditions') urlPath = `/conditions/${article.slug}`;

      return {
        url: absoluteUrl(urlPath),
        lastModified: currentDateStr,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      };
    });

  return [...staticRoutes, ...guideRoutes, ...toolRoutes, ...articleRoutes];
}

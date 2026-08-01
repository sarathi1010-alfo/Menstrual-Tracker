import { MetadataRoute } from 'next';
import { getGuideSlugs, getArticleSlugs } from '@/lib/mdx';
import seoData from '@/data/pSeoData.json';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  // Use a string to ensure no timezone fluctuation for static generation
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
      url: absoluteUrl('/blog'),
      lastModified: currentDateStr,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/features'),
      lastModified: currentDateStr,
      changeFrequency: 'monthly',
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

  // Guides
  const guideSlugs = getGuideSlugs() || [];
  const guideRoutes: MetadataRoute.Sitemap = guideSlugs
    .filter((slug) => slug && slug.trim() !== '')
    .map((slug) => ({
      url: absoluteUrl(`/guides/${slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  // Articles (Blog, Use Cases, Conditions, Micro-Answers)
  const articleSlugs = getArticleSlugs() || [];
  const articleRoutes: MetadataRoute.Sitemap = articleSlugs
    .filter((slug) => slug && slug.trim() !== '')
    .map((slug) => {
      let path = `/blog/${slug}`;
      if (slug.startsWith('what-is-')) {
         path = `/${slug}`;
      } else if (slug.includes('use-case') || slug.includes('teens-guide')) {
         path = `/use-cases/${slug}`;
      } else if (slug.includes('conditions') || slug.includes('pcos')) {
         path = `/conditions/${slug}`;
      }
      return {
        url: absoluteUrl(path),
        lastModified: currentDateStr,
        changeFrequency: 'monthly',
        priority: 0.8,
      };
    });

  const toolsData = seoData || [];
  const toolRoutes: MetadataRoute.Sitemap = toolsData
    .filter((tool) => tool && tool.slug && tool.slug.trim() !== '')
    .map((tool) => ({
      url: absoluteUrl(`/tools/${tool.slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'monthly',
      priority: 0.9,
    }));

  return [...staticRoutes, ...guideRoutes, ...articleRoutes, ...toolRoutes];
}

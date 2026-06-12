import { MetadataRoute } from 'next';
import { getGuideSlugs } from '@/lib/mdx';
import seoData from '@/data/pSeoData.json';
import { siteConfig, absoluteUrl } from '@/lib/seo';

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
      changeFrequency: 'monthly',
      priority: 0.7, // Internal programmatic pages get high but sub-core priority
    }));

  const toolsData = seoData || [];
  const toolRoutes: MetadataRoute.Sitemap = toolsData
    .filter((tool) => tool && tool.slug && tool.slug.trim() !== '')
    .map((tool) => ({
      url: absoluteUrl(`/tools/${tool.slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'monthly',
      priority: 0.9,
    }));

  return [...staticRoutes, ...guideRoutes, ...toolRoutes];
}

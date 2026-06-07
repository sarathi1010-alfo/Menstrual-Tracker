import { MetadataRoute } from 'next';
import { getGuideSlugs } from '@/lib/mdx';
import seoData from '@/data/pSeoData.json';
import { siteConfig, absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Static core pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: absoluteUrl('/tracker'),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/guides'),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/faq'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/about'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: absoluteUrl('/privacy'),
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: absoluteUrl('/terms-of-service'),
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: absoluteUrl('/contact'),
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];

  // Dynamic programmatic SEO pages
  const guideSlugs = getGuideSlugs();
  const guideRoutes: MetadataRoute.Sitemap = guideSlugs.map((slug) => ({
    url: absoluteUrl(`/guides/${slug}`),
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7, // Internal programmatic pages get high but sub-core priority
  }));

  const toolRoutes: MetadataRoute.Sitemap = seoData.map((tool) => ({
    url: absoluteUrl(`/tools/${tool.slug}`),
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...guideRoutes, ...toolRoutes];
}

import { MetadataRoute } from 'next';
import { getGuideSlugs } from '@/lib/mdx';
import seoData from '@/data/pSeoData.json';
import { absoluteUrl } from '@/lib/seo';

import { getArticleSlugs, getArticleBySlug } from '@/lib/mdx';

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
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
    {
      url: absoluteUrl('/features'),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: absoluteUrl('/blog'),
      lastModified: currentDateStr,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  // Map change frequencies inside static routes specifically due to TS requirements
  staticRoutes.forEach(r => {
    // Casting to literal type to avoid TS errors
    if (r.url === absoluteUrl('/')) r.changeFrequency = 'monthly' as const;
    if (r.url === absoluteUrl('/tracker')) r.changeFrequency = 'weekly' as const;
    if (r.url === absoluteUrl('/guides')) r.changeFrequency = 'weekly' as const;
    if (r.url === absoluteUrl('/faq')) r.changeFrequency = 'monthly' as const;
    if (r.url === absoluteUrl('/about')) r.changeFrequency = 'monthly' as const;
    if (r.url === absoluteUrl('/privacy')) r.changeFrequency = 'yearly' as const;
    if (r.url === absoluteUrl('/terms-of-service')) r.changeFrequency = 'yearly' as const;
  });

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

  const blogSlugs = getArticleSlugs() || [];
  const blogRoutes: MetadataRoute.Sitemap = blogSlugs
    .filter((slug) => slug && slug.trim() !== '')
    .map((slug) => {
      const article = getArticleBySlug(slug);
      let path = `/blog/${slug}`;
      if (article) {
        if (article.meta.category === 'what-is') path = `/${slug}`;
        if (article.meta.category === 'use-cases') path = `/use-cases/${slug}`;
        if (article.meta.category === 'conditions') path = `/conditions/${slug}`;
      }
      return {
        url: absoluteUrl(path),
        lastModified: currentDateStr,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      };
    });

  const toolsData = seoData || [];
  const toolRoutes: MetadataRoute.Sitemap = toolsData
    .filter((tool) => tool && tool.slug && tool.slug.trim() !== '')
    .map((tool) => ({
      url: absoluteUrl(`/tools/${tool.slug}`),
      lastModified: currentDateStr,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }));

  return [...staticRoutes, ...guideRoutes, ...blogRoutes, ...toolRoutes];
}

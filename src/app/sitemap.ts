import { getArticleSlugs } from '@/lib/mdx';
import { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getArticleSlugs();

  const blogEntries = slugs.map((slug) => ({
    url: absoluteUrl(`/blog/${slug}`),
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const routes = [
    '',
    '/tracker',
    '/blog',
    '/features',
    '/about',
    '/faq',
    '/privacy',
    '/terms-of-service',
    '/contact',
    '/tools/next-period-predictor',
    '/tools/safe-days-calculator',
    '/tools/ovulation-calculator',
  ].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes, ...blogEntries];
}

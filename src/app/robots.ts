import { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // Standard practice to block APIs
    },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}

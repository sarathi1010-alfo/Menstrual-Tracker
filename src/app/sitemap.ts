import { MetadataRoute } from 'next';
import { getAllGuides } from '@/lib/mdx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lunacycle.alfo.online';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${baseUrl}/terms-of-service`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${baseUrl}/features`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
  ];

  const guideRoutes = getAllGuides().map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const toolRoutes = [
    { url: `${baseUrl}/tools/ovulation-calculator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/tools/period-calculator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/tools/safe-days-calculator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
  ];

  try {
    const { getAllArticles } = await import('@/lib/mdx');
    const articles = getAllArticles();

    const blogRoutes = articles.map((article) => {
      let path = `/blog/${article.slug}`;
      if (article.category === 'what-is') path = `/${article.slug}`;
      if (article.category === 'use-cases') path = `/use-cases/${article.slug}`;
      if (article.category === 'conditions') path = `/conditions/${article.slug}`;

      return {
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
    });

    return [...staticRoutes, ...toolRoutes, ...guideRoutes, ...blogRoutes];
  } catch (e) {
    return [...staticRoutes, ...toolRoutes, ...guideRoutes];
  }
}

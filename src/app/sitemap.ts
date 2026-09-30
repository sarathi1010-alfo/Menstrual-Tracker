import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lunacycle.alfo.online';

  // Base routes
  const routes = [
    '',
    '/about',
    '/tracker',
    '/tools',
    '/tools/cycle-length-calculator',
    '/tools/ovulation-calculator',
    '/tools/period-calculator',
    '/privacy',
    '/terms-of-service',
    '/contact',
    '/faq',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    const { getAllGuides, getAllArticles } = await import('@/lib/mdx');

    const guides = getAllGuides();
    const guideRoutes = guides.map((guide) => ({
      url: `${baseUrl}/guides/${guide.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    const articles = getAllArticles();
    const articleRoutes = articles.map((article) => {
      let routePath = `/blog/${article.slug}`;
      if (article.category === 'what-is') {
        routePath = `/${article.slug}`;
      } else if (article.category === 'use-cases') {
        routePath = `/use-cases/${article.slug}`;
      } else if (article.category === 'conditions') {
        routePath = `/conditions/${article.slug}`;
      }

      return {
        url: `${baseUrl}${routePath}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      };
    });

    return [...routes, ...guideRoutes, ...articleRoutes];
  } catch (error) {
    console.error('Failed to generate sitemap routes from MDX:', error);
    return routes;
  }
}

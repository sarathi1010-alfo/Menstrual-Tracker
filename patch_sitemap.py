import re

with open('src/app/sitemap.ts', 'r') as f:
    content = f.read()

# Make it async
content = content.replace('export default function sitemap(): MetadataRoute.Sitemap {', 'import { getAllArticles } from \'@/lib/mdx\';\n\nexport default async function sitemap(): Promise<MetadataRoute.Sitemap> {')

# Add blog routes
if 'const blogArticles = getAllArticles();' not in content:
    content = content.replace('return [...staticRoutes, ...guideRoutes, ...toolRoutes];', """
  const blogArticles = getAllArticles();

  const whatIsArticles = blogArticles.filter(a => a.category === 'what-is');
  const whatIsRoutes: MetadataRoute.Sitemap = whatIsArticles.map((article) => ({
    url: absoluteUrl(`/${article.slug}`),
    lastModified: currentDateStr,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const generalBlogArticles = blogArticles.filter(a => a.category !== 'what-is');
  const blogRoutes: MetadataRoute.Sitemap = generalBlogArticles.map((article) => ({
    url: absoluteUrl(`/blog/${article.slug}`),
    lastModified: currentDateStr,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...guideRoutes, ...toolRoutes, ...whatIsRoutes, ...blogRoutes];
""")

    # Fix explicit cast
    content = content.replace('changeFrequency: \'monthly\',', 'changeFrequency: \'monthly\' as const,')
    content = content.replace('changeFrequency: \'weekly\',', 'changeFrequency: \'weekly\' as const,')
    content = content.replace('changeFrequency: \'yearly\',', 'changeFrequency: \'yearly\' as const,')

with open('src/app/sitemap.ts', 'w') as f:
    f.write(content)

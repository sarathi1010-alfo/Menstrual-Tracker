const fs = require('fs');
let sitemapContent = fs.readFileSync('src/app/sitemap.ts', 'utf8');

if (sitemapContent.includes('export default async function sitemap')) {
  console.log('Already async');
} else {
  sitemapContent = sitemapContent.replace(
    'import { getGuideSlugs } from \'@/lib/mdx\';',
    `import { getGuideSlugs, getArticleSlugs, getArticleBySlug } from '@/lib/mdx';`
  );
  sitemapContent = sitemapContent.replace(
    'export default function sitemap()',
    'export default async function sitemap()'
  );

  const articleRoutesString = `
  const articleSlugs = getArticleSlugs() || [];
  const articleRoutes: MetadataRoute.Sitemap = articleSlugs
    .map(slug => {
      const article = getArticleBySlug(slug);
      if (!article) return null;
      let urlPath = \`/blog/\${slug}\`;
      if (article.meta.category === 'what-is') urlPath = \`/\${slug}\`;
      else if (article.meta.category === 'use-cases') urlPath = \`/use-cases/\${slug}\`;
      else if (article.meta.category === 'conditions') urlPath = \`/conditions/\${slug}\`;

      return {
        url: absoluteUrl(urlPath),
        lastModified: currentDateStr,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      };
    })
    .filter((route): route is NonNullable<typeof route> => route !== null);

  return [...staticRoutes, ...guideRoutes, ...toolRoutes, ...articleRoutes, { url: absoluteUrl('/blog'), lastModified: currentDateStr, changeFrequency: 'daily' as const, priority: 0.9 }];
`;

  sitemapContent = sitemapContent.replace(
    'return [...staticRoutes, ...guideRoutes, ...toolRoutes];',
    articleRoutesString
  );

  sitemapContent = sitemapContent.replace(/changeFrequency: 'monthly',/g, "changeFrequency: 'monthly' as const,");
  sitemapContent = sitemapContent.replace(/changeFrequency: 'weekly',/g, "changeFrequency: 'weekly' as const,");
  sitemapContent = sitemapContent.replace(/changeFrequency: 'yearly',/g, "changeFrequency: 'yearly' as const,");

  fs.writeFileSync('src/app/sitemap.ts', sitemapContent);
  console.log('Patched');
}

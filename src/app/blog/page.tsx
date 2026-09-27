import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { constructMetadata, siteConfig, absoluteUrl } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Blog & Educational Guides',
  description: 'Explore our latest guides and articles about menstrual cycle tracking and health.',
  path: '/blog',
});

export default function BlogLanding() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">CycleHub Educational Blog</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((article) => {
          let href = `/blog/${article.slug}`;
          if (article.category === 'what-is') href = `/${article.slug}`;
          else if (article.category === 'use-cases') href = `/use-cases/${article.slug}`;
          else if (article.category === 'conditions') href = `/conditions/${article.slug}`;

          return (
            <div key={article.slug} className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
              <Link href={href}>
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{article.summary}</p>
                <span className="text-primary hover:underline">Read more &rarr;</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

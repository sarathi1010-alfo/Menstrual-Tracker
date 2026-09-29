import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';

export default function BlogLandingPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Blog & Educational Guides</h1>
      <p className="text-lg text-[var(--muted)] mb-12">
        Learn more about your menstrual cycle, reproductive health, and how to use LunaCycle for better insights.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((article) => {
          let href = `/blog/${article.slug}`;
          if (article.category === 'what-is') {
            href = `/${article.slug}`;
          } else if (article.category === 'use-cases') {
            href = `/use-cases/${article.slug}`;
          } else if (article.category === 'conditions') {
            href = `/conditions/${article.slug}`;
          }

          return (
            <Link
              key={article.slug}
              href={href}
              className="block p-6 bg-[var(--surface)] border border-gray-200 dark:border-gray-800 rounded-lg hover:border-[var(--primary)] transition-colors"
            >
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-[var(--muted)] line-clamp-3">{article.summary}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

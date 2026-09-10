import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Blog - LunaCycle Tracker',
  description: 'Read the latest guides and articles about tracking your cycle.',
  path: '/blog',
});

export default function BlogLandingPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="heading-1 mb-4">LunaCycle Blog</h1>
        <p className="text-[var(--muted)] text-lg">
          Learn about your cycle, fertility, and health.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((article) => {
          let path = `/blog/${article.slug}`;
          if (article.category === 'what-is') path = `/${article.slug}`;
          if (article.category === 'use-cases') path = `/use-cases/${article.slug}`;
          if (article.category === 'conditions') path = `/conditions/${article.slug}`;

          return (
            <Link
              key={article.slug}
              href={path}
              className="card p-6 block hover:shadow-md transition-shadow"
            >
              <h2 className="heading-3 mb-2">{article.title}</h2>
              <p className="text-[var(--muted)]">{article.summary}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

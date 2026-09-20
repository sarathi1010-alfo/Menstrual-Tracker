import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';

export const metadata = {
  title: 'Blog | LunaCycle',
  description: 'Read the latest articles about menstrual cycle tracking, reproductive health, and more.',
};

export default function BlogIndex() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="heading-1 mb-8">LunaCycle Blog</h1>
      <p className="text-lg text-[var(--muted)] mb-12">
        Educational resources on menstrual health, fertility, and cycle tracking.
      </p>

      <div className="grid gap-6">
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
              className="card p-6 hover:border-[var(--primary)] transition-colors border border-transparent block"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium bg-[var(--primary)]/10 text-[var(--primary)] px-2 py-1 rounded-full uppercase tracking-wider">
                  {article.category || 'Article'}
                </span>
              </div>
              <h2 className="heading-3 mb-2">{article.title}</h2>
              <p className="text-[var(--muted)]">{article.summary}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

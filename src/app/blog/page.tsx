import { getAllArticles } from '@/lib/mdx';
import Link from 'next/link';

export default function BlogLanding() {
  const articles = getAllArticles();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="heading-1 mb-6">LunaCycle Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
          let href = `/blog/${article.slug}`;
          if (article.category === 'what-is') href = `/${article.slug}`;
          else if (article.category === 'use-cases') href = `/use-cases/${article.slug}`;
          else if (article.category === 'conditions') href = `/conditions/${article.slug}`;

          return (
            <Link key={article.slug} href={href} className="card p-6 block hover:shadow-md transition-shadow">
              <h2 className="heading-3 mb-2">{article.title}</h2>
              <p className="text-[var(--muted)]">{article.summary}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

import { getAllArticles } from '@/lib/mdx';
import Link from 'next/link';

export const metadata = {
  title: 'Blog | LunaCycle',
  description: 'Learn about menstrual health, cycle tracking, and reproductive wellness.',
};

export default async function BlogPage() {
  const articles = getAllArticles();

  // Filter for regular blog cluster articles
  const blogArticles = articles.filter(a => a.category === 'cluster' || !a.category);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="heading-1 mb-8">LunaCycle Blog</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {blogArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="card p-6 hover:shadow-md transition-shadow"
          >
            <h2 className="heading-3 mb-2">{article.title}</h2>
            <p className="text-muted line-clamp-3">{article.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

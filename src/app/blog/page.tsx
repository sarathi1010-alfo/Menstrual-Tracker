import { getAllArticles } from '@/lib/mdx';
import Link from 'next/link';

export default async function BlogLandingPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">LunaCycle Blog</h1>
      <p className="text-xl mb-12">Learn everything about your menstrual cycle, reproductive health, and privacy-first tracking.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article) => {
          let href = `/blog/${article.slug}`;
          if (article.category === 'what-is') href = `/${article.slug}`;
          if (article.category === 'use-cases') href = `/use-cases/${article.slug}`;
          if (article.category === 'conditions') href = `/conditions/${article.slug}`;

          return (
            <Link key={article.slug} href={href} className="card p-6 block hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold mb-2 text-primary">{article.title}</h2>
              <p className="text-muted mb-4">{article.summary}</p>
              <div className="flex flex-wrap gap-2">
                {article.tags?.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">#{tag}</span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

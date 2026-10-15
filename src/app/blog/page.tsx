import { getAllArticles } from '@/lib/mdx';
import Link from 'next/link';

export default async function BlogPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">LunaCycle Blog</h1>
      <div className="grid gap-6">
        {articles.map((article) => {
          let href = `/blog/${article.slug}`;
          if (article.category === 'what-is') href = `/${article.slug}`;
          else if (article.category === 'use-cases') href = `/use-cases/${article.slug}`;
          else if (article.category === 'conditions') href = `/conditions/${article.slug}`;

          return (
            <Link key={article.slug} href={href} className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition">
              <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600">{article.summary}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

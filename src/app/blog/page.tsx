
import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';

export default function BlogIndexPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog & Educational Content</h1>

      <div className="grid gap-6">
        {articles.map((article) => {
          let href = `/blog/${article.slug}`;
          if (article.category === 'what-is') href = `/${article.slug}`;
          if (article.category === 'use-cases') href = `/use-cases/${article.slug}`;
          if (article.category === 'conditions') href = `/conditions/${article.slug}`;

          return (
            <Link key={article.slug} href={href} className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition">
              <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">{article.summary}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

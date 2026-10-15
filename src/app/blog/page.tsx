import { getAllArticles } from '@/lib/mdx';
import Link from 'next/link';

export default function BlogLanding() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">LunaCycle Blog</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
        Expert insights on menstrual health, cycle tracking, and reproductive wellness.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        {articles.filter(a => a.category === 'cluster' || !a.category).map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`}>
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 dark:border-gray-700 h-full">
              <h2 className="text-2xl font-semibold mb-3 text-blue-600 dark:text-blue-400">
                {article.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {article.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

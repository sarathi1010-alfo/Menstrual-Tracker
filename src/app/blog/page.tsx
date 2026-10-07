import { getAllArticles } from '@/lib/mdx';
import Link from 'next/link';

export const metadata = {
  title: 'Blog | LunaCycle',
  description: 'Educational resources and guides on menstrual health and cycle tracking.',
};

export default function BlogLandingPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">LunaCycle Blog</h1>
      <p className="text-xl text-gray-600 mb-12">
        Explore our guides on menstrual cycle fundamentals, conditions, and tracking strategies.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
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
            <Link key={article.slug} href={href} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
              <p className="text-gray-600 mb-4">{article.summary}</p>
              <span className="text-blue-600 font-medium">Read more →</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

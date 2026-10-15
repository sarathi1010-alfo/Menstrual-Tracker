import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Blog | LunaCycle',
  description: 'Read the latest articles on menstrual health, cycle tracking, and reproductive wellness.',
  openGraph: {
    title: 'Blog | LunaCycle',
    description: 'Read the latest articles on menstrual health, cycle tracking, and reproductive wellness.',
    url: absoluteUrl('/blog'),
  },
};

export default function BlogIndex() {
  const articles = getAllArticles().filter(a => a.category === 'blog');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">LunaCycle Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`} className="block border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-600 mb-4">{article.summary}</p>
            <span className="text-blue-600 hover:underline">Read more &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

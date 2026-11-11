import { getAllArticles } from '@/lib/mdx';
import Link from 'next/link';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export default function BlogLandingPage() {
  const allArticles = getAllArticles();
  const blogArticles = allArticles.filter((article) => article.category === 'blog');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'LunaCycle Blog',
    description: 'Educational articles about menstrual cycle tracking and health.',
    url: 'https://lunacycle.alfo.online/blog',
    publisher: {
      '@type': 'Organization',
      name: 'LunaCycle',
      url: 'https://lunacycle.alfo.online',
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SchemaMarkup schema={schema} />
      <h1 className="text-4xl font-bold mb-8">LunaCycle Blog</h1>
      <MedicalDisclaimer />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {blogArticles.map((article) => (
          <div key={article.slug} className="border p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/blog/${article.slug}`} className="hover:text-amber-600">
                {article.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">{article.summary}</p>
            <Link href={`/blog/${article.slug}`} className="text-amber-600 font-medium">
              Read more &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

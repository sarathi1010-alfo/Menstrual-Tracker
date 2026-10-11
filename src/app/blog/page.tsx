import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';

export const metadata: Metadata = constructMetadata({
  title: 'Blog | LunaCycle',
  description: 'Learn about the menstrual cycle, how to track it, and what it means for your health.',
});

export default function BlogIndex() {
  const articles = getAllArticles();

  const getHref = (article: import('@/lib/mdx').ArticleMeta) => {
    switch (article.category) {
      case 'what-is':
        return `/${article.slug}`;
      case 'use-cases':
        return `/use-cases/${article.slug}`;
      case 'conditions':
        return `/conditions/${article.slug}`;
      default:
        return `/blog/${article.slug}`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">LunaCycle Blog</h1>
      <p className="text-lg text-gray-700 mb-8">
        Learn about the menstrual cycle, how to track it, and what it means for your health.
      </p>

      <MedicalDisclaimer />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {articles.map((article) => (
          <div key={article.slug} className="card p-6 flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-2">
              <Link href={getHref(article)} className="hover:text-primary transition-colors">
                {article.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4 flex-grow">{article.summary}</p>
            <div className="mt-auto">
              <Link
                href={getHref(article)}
                className="text-primary font-medium hover:underline"
              >
                Read more &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
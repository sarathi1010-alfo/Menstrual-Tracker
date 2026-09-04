import { getAllArticles } from '@/lib/mdx';
import Link from 'next/link';
import { Metadata } from 'next';
import { SchemaMarkup } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'LunaCycle Blog - Menstrual Health & Tracking Guides',
  description: 'Explore our latest guides and articles on menstrual health, cycle tracking, and reproductive wellness.',
};

export default function BlogLandingPage() {
  const allArticles = getAllArticles().filter(a => a.category !== 'what-is' && a.category !== 'use-cases' && a.category !== 'conditions');

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "LunaCycle Blog",
    "description": metadata.description,
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <SchemaMarkup schema={webpageSchema} />
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8">LunaCycle Blog</h1>
      <p className="text-xl text-gray-500 dark:text-gray-400 mb-12">Insights, guides, and tips for your menstrual health journey.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allArticles.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`} className="block group">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 h-full transition-all duration-200 hover:shadow-md hover:-translate-y-1">
              <div className="mb-4">
                 <span className="inline-block bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                   Article
                 </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[var(--primary)] transition-colors mb-3">
                {article.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                {article.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

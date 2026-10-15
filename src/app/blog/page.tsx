import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - LunaCycle',
  description: 'Learn about menstrual health, cycle tracking, and reproductive wellness.',
};

export default function BlogLandingPage() {
  const articles = getAllArticles().filter(a => a.category === 'cluster' || !a.category);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <MedicalDisclaimer />
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">LunaCycle Blog</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {articles.map((article) => (
          <div key={article.slug} className="card p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/blog/${article.slug}`} className="hover:text-[var(--primary)] transition-colors">
                {article.title}
              </Link>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {article.summary}
            </p>
            <Link href={`/blog/${article.slug}`} className="text-[var(--primary)] font-medium hover:underline">
              Read more &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

import { getAllArticles } from '@/lib/mdx';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata = constructMetadata({
  title: 'LunaCycle Blog - Privacy-First Cycle Tracking Education',
  description: 'Learn about the menstrual cycle, ovulation, fertility, and more with our privacy-first cycle tracking educational resources.',
  path: '/blog',
});

export default function BlogLandingPage() {
  const allArticles = getAllArticles();

  const clusters = allArticles.filter(a => !a.category || a.category === 'cluster');
  const micros = allArticles.filter(a => a.category === 'what-is');
  const useCases = allArticles.filter(a => a.category === 'use-cases');
  const conditions = allArticles.filter(a => a.category === 'conditions');

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)]">LunaCycle Educational Hub</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          Understand your body with our comprehensive guides on menstrual health, fertility, and cycle tracking.
        </p>
      </div>

      <MedicalDisclaimer />

      {clusters.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-800">Cycle Fundamentals & Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clusters.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="card p-6 block hover:border-[var(--primary)] transition-colors group">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)]">{article.title}</h3>
                <p className="text-[var(--muted)] line-clamp-2">{article.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {micros.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-800">Quick Answers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {micros.map((article) => (
              <Link key={article.slug} href={`/${article.slug}`} className="p-4 bg-[var(--surface)] border border-gray-200 dark:border-gray-800 rounded-xl hover:border-[var(--primary)] transition-colors group">
                <h3 className="font-semibold group-hover:text-[var(--primary)] line-clamp-2">{article.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {useCases.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-800">Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((article) => (
              <Link key={article.slug} href={`/use-cases/${article.slug}`} className="card p-6 block hover:border-[var(--primary)] transition-colors group">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)]">{article.title}</h3>
                <p className="text-[var(--muted)] line-clamp-2">{article.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {conditions.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-800">Conditions & Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {conditions.map((article) => (
              <Link key={article.slug} href={`/conditions/${article.slug}`} className="card p-6 block hover:border-[var(--primary)] transition-colors group">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)]">{article.title}</h3>
                <p className="text-[var(--muted)] line-clamp-2">{article.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

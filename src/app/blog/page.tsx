import { constructMetadata } from '@/lib/seo';
import { getAllArticles } from '@/lib/mdx';
import Link from 'next/link';

export const metadata = constructMetadata({
  title: 'Menstrual Cycle Tracking Blog - LunaCycle',
  description: 'Learn about menstrual cycle tracking, hormones, period phases, and reproductive health with LunaCycle.',
  path: '/blog',
});

export default function BlogLandingPage() {
  const allArticles = getAllArticles();

  // Group by category (simplified for this layout)
  const clusters = allArticles.filter(a => a.category === 'cluster' || a.category === 'blog');
  const microAnswers = allArticles.filter(a => a.category === 'what-is' || a.category === 'micro-answer');
  const useCases = allArticles.filter(a => a.category === 'use-cases');
  const conditions = allArticles.filter(a => a.category === 'conditions');

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="heading-1">LunaCycle Education Hub</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          Everything you need to know about your cycle, hormones, and reproductive health.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="heading-2 border-b border-[var(--border)] pb-2">Cycle Fundamentals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clusters.map(article => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="card p-6 block hover:border-[var(--primary)] transition-colors">
              <h3 className="heading-3 mb-2">{article.title}</h3>
              <p className="text-[var(--muted)]">{article.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      {microAnswers.length > 0 && (
        <section className="space-y-6">
          <h2 className="heading-2 border-b border-[var(--border)] pb-2">Quick Answers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {microAnswers.map(article => (
              <Link key={article.slug} href={`/${article.slug}`} className="card p-4 block hover:border-[var(--primary)] transition-colors">
                <h3 className="font-semibold">{article.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {useCases.length > 0 && (
        <section className="space-y-6">
          <h2 className="heading-2 border-b border-[var(--border)] pb-2">Guides for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map(article => (
              <Link key={article.slug} href={`/use-cases/${article.slug}`} className="card p-6 block hover:border-[var(--primary)] transition-colors">
                <h3 className="heading-3 mb-2">{article.title}</h3>
                <p className="text-[var(--muted)]">{article.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {conditions.length > 0 && (
        <section className="space-y-6">
          <h2 className="heading-2 border-b border-[var(--border)] pb-2">Health & Conditions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {conditions.map(article => (
              <Link key={article.slug} href={`/conditions/${article.slug}`} className="card p-6 block hover:border-[var(--primary)] transition-colors">
                <h3 className="heading-3 mb-2">{article.title}</h3>
                <p className="text-[var(--muted)]">{article.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

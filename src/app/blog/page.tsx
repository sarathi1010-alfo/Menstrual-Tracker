import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata = constructMetadata({
  title: 'CycleHub Blog - Menstrual Health & Cycle Tracking Guides',
  description: 'Explore comprehensive guides, tips, and insights on menstrual health, cycle tracking, ovulation, and more.',
  path: '/blog',
});

export default function BlogLandingPage() {
  const allArticles = getAllArticles();

  // Route specific content appropriately
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
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="heading-1 mb-4">CycleHub Blog</h1>
        <p className="text-[var(--muted)] text-lg">
          Insights, guides, and tips for understanding your menstrual cycle and reproductive health.
        </p>
      </div>

      <MedicalDisclaimer />

      <div className="grid gap-6 sm:grid-cols-2">
        {allArticles.map((article) => (
          <Link
            key={article.slug}
            href={getHref(article)}
            className="card p-6 block hover:border-[var(--primary)] transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="heading-3">{article.title}</h2>
              {article.category && (
                <span className="text-xs bg-[var(--accent)]/10 text-[var(--accent)] px-2 py-1 rounded-full capitalize shrink-0 ml-2">
                  {article.category.replace('-', ' ')}
                </span>
              )}
            </div>
            <p className="text-[var(--muted)] text-sm mb-4 line-clamp-2">
              {article.summary}
            </p>
            <span className="text-[var(--primary)] text-sm font-medium">Read more →</span>
          </Link>
        ))}
        {allArticles.length === 0 && (
          <div className="col-span-full text-center py-12 text-[var(--muted)]">
            No articles found. Check back soon!
          </div>
        )}
      </div>
    </div>
  );
}

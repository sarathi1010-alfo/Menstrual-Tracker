import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'LunaCycle Blog - Menstrual Health & Cycle Tracking Guides',
  description: 'Explore comprehensive guides, micro-answers, and use-case articles on menstrual health, cycle phases, and privacy-first tracking.',
  path: '/blog',
});

export default async function BlogLandingPage() {
  const articles = getAllArticles();

  const getArticleLink = (category?: string, slug?: string) => {
    switch (category) {
      case 'what-is':
        return `/${slug}`;
      case 'use-cases':
        return `/use-cases/${slug}`;
      case 'conditions':
        return `/conditions/${slug}`;
      default:
        return `/blog/${slug}`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="heading-1 mb-4">LunaCycle Blog</h1>
        <p className="text-[var(--muted)] text-lg">
          Learn everything you need to know about your menstrual cycle, tracking methods, and hormonal health.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={getArticleLink(article.category, article.slug)}
            className="card p-6 block hover:ring-2 hover:ring-[var(--primary)] transition-all"
          >
            <h2 className="heading-3 mb-2">{article.title}</h2>
            <p className="text-[var(--muted)] line-clamp-3">{article.summary}</p>
            {article.category && (
              <span className="inline-block mt-4 px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold rounded-full uppercase tracking-wider">
                {article.category.replace('-', ' ')}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

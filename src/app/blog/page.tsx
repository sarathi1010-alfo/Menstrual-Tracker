import { getAllArticles } from '@/lib/mdx';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Blog - LunaCycle',
  description: 'Learn more about menstrual cycles, tracking, and health.',
  path: '/blog',
});

export default function BlogLandingPage() {
  const allArticles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="heading-1 mb-4">LunaCycle Blog</h1>
        <p className="text-[var(--muted)] text-lg">
          Insights on menstrual health, cycle tracking, and beyond.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {allArticles.map(article => {
          let prefix = '/blog';
          if (article.category === 'use-cases') prefix = '/use-cases';
          else if (article.category === 'conditions') prefix = '/conditions';
          else if (article.category === 'what-is') prefix = '';

          return (
            <Link key={article.slug} href={`${prefix}/${article.slug}`} className="card p-6 hover:border-[var(--primary)]/50 transition-all group">
              <div className="flex gap-2 mb-2 flex-wrap">
                {article.tags?.slice(0, 2).map((tag: string) => (
                  <span key={tag} className="text-xs font-medium px-2 py-0.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-semibold text-xl mb-2 group-hover:text-[var(--primary)] transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-[var(--muted)] line-clamp-3">
                {article.summary}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

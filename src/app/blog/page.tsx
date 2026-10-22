import Link from 'next/link';
import { Metadata } from 'next';
import { getAllArticles } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Blog - LunaCycle',
  description: 'Educational resources on menstrual health, cycle tracking, and reproductive wellness.',
  path: '/blog',
});

export default async function BlogIndex() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="heading-1">Cycle Health Blog</h1>
        <p className="text-lg text-[var(--muted)]">Learn about your body, hormones, and how to track your cycle effectively.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {articles.map((article) => {
          let href = `/blog/${article.slug}`;
          if (article.category === 'what-is') {
             href = `/${article.slug}`;
          } else if (article.category === 'use-cases') {
             href = `/use-cases/${article.slug}`;
          } else if (article.category === 'conditions') {
             href = `/conditions/${article.slug}`;
          }

          return (
            <Link key={article.slug} href={href} className="card p-6 flex flex-col hover:border-[var(--primary)]/50 transition-all group">
              <h2 className="text-xl font-semibold mb-3 group-hover:text-[var(--primary)] transition-colors">{article.title}</h2>
              <p className="text-[var(--muted)] text-sm mb-4 flex-grow">{article.summary}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {article.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-[var(--secondary)]/10 text-[var(--secondary)] rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

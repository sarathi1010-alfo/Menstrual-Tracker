import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'LunaCycle Blog - Menstrual Health & Cycle Tracking',
  description: 'Read the latest guides, articles, and insights on menstrual health, cycle tracking, and reproductive wellness.',
};

export default function BlogIndex() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-[var(--foreground)] tracking-tight mb-8">
        LunaCycle Blog
      </h1>

      <p className="text-xl text-[var(--muted)] mb-12">
        Explore our comprehensive guides on cycle phases, health conditions, and more.
      </p>

      <MedicalDisclaimer />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
            <Link
              key={article.slug}
              href={href}
              className="card p-6 flex flex-col hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-xl font-bold text-[var(--primary)] mb-2">
                {article.title}
              </h2>
              <p className="text-[var(--muted)] flex-grow">
                {article.summary}
              </p>
              {article.tags && article.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {article.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--accent)]/20 text-[var(--foreground)]">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

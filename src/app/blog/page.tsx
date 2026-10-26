import Link from 'next/link';
import { Metadata } from 'next';
import { getAllArticles } from '@/lib/mdx';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Blog - LunaCycle',
  description: 'Educational articles and guides about the menstrual cycle, tracking, and reproductive health.',
  path: '/blog',
});

export default function BlogLandingPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="heading-1 mb-4">LunaCycle Blog</h1>
      <p className="text-lg text-[var(--muted)] mb-12">
        Explore our educational guides and articles on menstrual health, cycle tracking, and reproductive well-being.
      </p>

      <div className="grid gap-8 sm:grid-cols-2">
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
              className="card p-6 hover:border-[var(--primary)]/50 transition-all block group"
            >
              <h2 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)] transition-colors">
                {article.title}
              </h2>
              <p className="text-[var(--muted)] line-clamp-3">
                {article.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {article.tags?.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-16">
        <MedicalDisclaimer />
      </div>
    </div>
  );
}

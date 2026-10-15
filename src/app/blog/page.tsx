import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata = constructMetadata({
  title: 'LunaCycle Blog - Period Tracking Guides & Education',
  description: 'Explore our library of articles on the menstrual cycle, period tracking, and women\'s health.',
  path: '/blog',
});

export default function BlogLandingPage() {
  const allArticles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="heading-1 mb-4">LunaCycle Health & Education</h1>
        <p className="text-[var(--muted)] text-lg">
          Learn about your body's natural rhythms, explore in-depth guides on cycle tracking, and get answers to common questions.
        </p>
      </div>

      <MedicalDisclaimer />

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {allArticles.map((article) => {
          let href = `/blog/${article.slug}`;
          if (article.category === 'what-is') href = `/${article.slug}`;
          if (article.category === 'use-cases') href = `/use-cases/${article.slug}`;
          if (article.category === 'conditions') href = `/conditions/${article.slug}`;

          return (
            <Link
              key={article.slug}
              href={href}
              className="card p-6 block hover:border-[var(--primary)] transition-colors group"
            >
              <h2 className="heading-3 mb-2 group-hover:text-[var(--primary)] transition-colors">
                {article.title}
              </h2>
              <p className="text-[var(--muted)] text-sm line-clamp-3">
                {article.summary}
              </p>
              <div className="mt-4 text-xs font-medium text-[var(--accent)] uppercase tracking-wider">
                {article.category === 'what-is' ? 'Quick Answer' : article.category}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

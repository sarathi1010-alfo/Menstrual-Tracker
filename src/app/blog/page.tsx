import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'LunaCycle Blog - Privacy-First Menstrual Cycle Tracking',
  description: 'Read the latest guides, deep-dives, and updates from LunaCycle.',
  path: '/blog',
});

export default function BlogLandingPage() {
  const allArticles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
        <h1 className="heading-1">LunaCycle Blog</h1>
        <p className="text-[var(--muted)] text-lg">
          Educational resources, privacy-first tracker guides, and health deep-dives.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {allArticles.map((article) => {
          let href = `/blog/${article.slug}`;
          if (article.category === 'what-is') href = `/${article.slug}`;
          else if (article.category === 'use-cases') href = `/use-cases/${article.slug}`;
          else if (article.category === 'conditions') href = `/conditions/${article.slug}`;

          return (
            <Link
              key={article.slug}
              href={href}
              className="card p-6 block hover:shadow-md transition-shadow"
            >
              <h2 className="heading-3 mb-2">{article.title}</h2>
              <p className="text-[var(--muted)] mb-4">{article.summary}</p>
              <span className="text-[var(--primary)] font-medium text-sm">
                Read Article →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

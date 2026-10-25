import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';

export const metadata = constructMetadata({
  title: 'CycleHub Blog',
  description: 'Read the latest guides and articles about menstrual health and cycle tracking.',
  path: '/blog',
});

export default function BlogLanding() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">CycleHub Blog</h1>
        <p className="text-[var(--muted)] text-lg">
          Educational resources, tips, and deep-dives into menstrual health.
        </p>
      </div>

      <MedicalDisclaimer />

      <div className="grid gap-6">
        {articles.map((article) => {
          let path = `/blog/${article.slug}`;
          if (article.category === 'what-is') {
            path = `/${article.slug}`;
          } else if (article.category === 'use-cases') {
            path = `/use-cases/${article.slug}`;
          } else if (article.category === 'conditions') {
            path = `/conditions/${article.slug}`;
          }

          return (
            <Link
              key={article.slug}
              href={path}
              className="card p-6 block hover:bg-[var(--surface-hover)] transition-colors"
            >
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-[var(--muted)]">{article.summary}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

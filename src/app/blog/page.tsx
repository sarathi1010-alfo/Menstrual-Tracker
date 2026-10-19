import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';

export const metadata = constructMetadata({
  title: 'Blog - CycleHub Educational Articles',
  description: 'Read the latest educational articles on menstrual health, cycle tracking, and reproductive wellness.',
  path: '/blog',
});

export default async function BlogIndexPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="heading-1 mb-4">Blog</h1>
        <p className="text-[var(--muted)] text-lg">
          Educational resources to help you understand your cycle and reproductive health.
        </p>
      </div>

      <MedicalDisclaimer />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <Link key={article.slug} href={href} className="card p-6 block hover:border-[var(--primary)] transition-colors">
              <h2 className="heading-3 mb-2">{article.title}</h2>
              <p className="text-[var(--muted)] line-clamp-3">{article.summary}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
